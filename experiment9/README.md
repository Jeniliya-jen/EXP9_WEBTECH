# Experiment 9: Modern User Interface Design using ReactJS

This standalone Vite + React app presents the Royal Classics fashion magazine
as a responsive, interactive user interface. It uses reusable functional
components and props for the header, featured story, collection cards, and
editorial sections. React `useState` powers light/dark theme switching, the
filterable wardrobe planner, and newsletter feedback.

The page uses the Royal Classics copy and product imagery from the main site,
including the collections, collection overview, fashion dictionary, wardrobe
guide, contact details, and subscription content. The original site and
Node.js server experiment remain unchanged.

## Run it

1. Open a terminal in the project folder.
2. Install the dependencies once:

   ```sh
   cd experiment9
   npm install
   ```

3. Start the development server:

   ```sh
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).
5. To verify a production build, run `npm run build`.

The root folder's existing `npm start` command still starts the Node.js server;
it is separate from this React experiment.
