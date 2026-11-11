const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const { URL } = require("node:url");

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const MAX_BODY_SIZE = 1024 * 1024;
const users = [
  { id: 1, name: "Alice", role: "Software Engineer" },
  { id: 2, name: "Bob", role: "Systems Architect" }
];
let items = [
  { id: 101, name: "Server Rack Unit", stock: 12 },
  { id: 102, name: "Gigabit Switch", stock: 5 }
];

function sendJson(res, statusCode, data, headers = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers
  });
  res.end(JSON.stringify(data));
}

function sendHtml(res, statusCode, html) {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(html);
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    let settled = false;

    req.setEncoding("utf8");
    req.on("data", chunk => {
      if (settled) return;
      body += chunk;
      if (Buffer.byteLength(body) > MAX_BODY_SIZE) {
        settled = true;
        reject(Object.assign(new Error("Request body is too large"), { statusCode: 413 }));
      }
    });
    req.on("end", () => {
      if (settled) return;
      settled = true;
      try {
        resolve(JSON.parse(body));
      } catch {
        reject(Object.assign(new Error("Request body must be valid JSON"), { statusCode: 400 }));
      }
    });
    req.on("error", error => {
      if (!settled) reject(error);
    });
  });
}

async function serveStaticFile(res, pathname) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    sendJson(res, 400, { success: false, message: "Invalid URL path" });
    return;
  }

  const filePath = path.resolve(ROOT, `.${decodedPath}`);
  if (!filePath.startsWith(`${ROOT}${path.sep}`) || path.basename(filePath) === "server.js") {
    sendJson(res, 404, { success: false, message: "Resource Not Found" });
    return;
  }

  const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".css": "text/css; charset=utf-8"
  };
  const contentType = contentTypes[path.extname(filePath).toLowerCase()];
  if (!contentType) {
    sendJson(res, 404, { success: false, message: "Resource Not Found" });
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(file);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      sendJson(res, 404, { success: false, message: "Resource Not Found" });
      return;
    }
    throw error;
  }
}

async function handleRequest(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const { pathname } = requestUrl;
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${pathname}`);

  if (pathname === "/api/users") {
    if (req.method !== "GET") {
      sendJson(res, 405, { success: false, message: "Method Not Allowed" }, { Allow: "GET" });
      return;
    }
    sendJson(res, 200, { success: true, count: users.length, data: users });
    return;
  }

  if (pathname === "/api/items") {
    if (req.method === "GET") {
      sendJson(res, 200, { success: true, data: items });
      return;
    }
    if (req.method === "POST") {
      let item;
      try {
        item = await readJsonBody(req);
      } catch (error) {
        if (error.statusCode) {
          sendJson(res, error.statusCode, { success: false, message: error.message });
          return;
        }
        throw error;
      }

      if (!item || typeof item !== "object" || Array.isArray(item)) {
        sendJson(res, 400, { success: false, message: "Request body must be a JSON object." });
        return;
      }
      const name = typeof item.name === "string" ? item.name.trim() : "";
      const stock = Number(item.stock);
      if (!name || item.stock === undefined || !Number.isInteger(stock) || stock < 0) {
        sendJson(res, 400, {
          success: false,
          message: "Provide an item name and a non-negative integer stock count."
        });
        return;
      }

      const newItem = { id: Math.max(100, ...items.map(existing => existing.id)) + 1, name, stock };
      items.push(newItem);
      sendJson(res, 201, { success: true, data: newItem });
      return;
    }
    sendJson(res, 405, { success: false, message: "Method Not Allowed" }, { Allow: "GET, POST" });
    return;
  }

  if (pathname === "/experiment") {
    if (req.method !== "GET") {
      sendJson(res, 405, { success: false, message: "Method Not Allowed" }, { Allow: "GET" });
      return;
    }
    sendHtml(res, 200, `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Node.js Server Experiment</title></head>
<body>
  <h1>Server-Side Application Powered by Node.js</h1>
  <p>Status: <strong>Active</strong></p>
  <p>Users API: <a href="/api/users">/api/users</a></p>
  <p>Items API: <a href="/api/items">/api/items</a></p>
  <p>Existing site: <a href="/">Royal Classics home</a></p>
</body>
</html>`);
    return;
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    sendJson(res, 405, { success: false, message: "Method Not Allowed" }, { Allow: "GET, HEAD" });
    return;
  }

  const staticPath = pathname === "/" ? "/index.html" : pathname;
  await serveStaticFile(res, staticPath);
}

const server = http.createServer((req, res) => {
  handleRequest(req, res).catch(error => {
    console.error("Request failed:", error);
    if (!res.headersSent) {
      sendJson(res, 500, { success: false, message: "Internal Server Error" });
    } else {
      res.destroy(error);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Node.js server listening on http://localhost:${PORT}`);
  console.log(`Experiment page: http://localhost:${PORT}/experiment`);
});
