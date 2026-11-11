import React, { useState } from "react";
import coatImage from "../../coat.png";
import fabricImage from "../../fabric.png";
import accessoriesImage from "../../accessories.png";
import watchImage from "../../Wristwatch.png";
import handbagImage from "../../Hand_bag.png";
import scarfImage from "../../Scarf.png";
import leatherBagImage from "../../Leather_Bag.png";

const collections = [
  {
    name: "Classic Coats",
    image: coatImage,
    description:
      "Elegant outerwear designed with timeless silhouettes, premium tailoring and neutral colours.",
    tip: "Layer over a cashmere turtleneck for winter evenings.",
    price: "₹8,999",
    season: "Winter",
    material: "Wool Blend",
    style: "Vintage",
  },
  {
    name: "Luxury Fabrics",
    image: fabricImage,
    description:
      "Discover carefully selected wool, linen and cashmere chosen for comfort, warmth and elegance.",
    tip: "As seen in our Winter '26 editorial spread.",
    price: "₹4,499",
    season: "All Seasons",
    material: "Cashmere & Linen",
    style: "Premium",
  },
  {
    name: "Accessories",
    image: accessoriesImage,
    description:
      "Minimal handbags and scarves that complete every classic wardrobe beautifully.",
    tip: "Pair the scarf with the classic coat for a monochrome look.",
    price: "₹2,299",
    season: "All Seasons",
    material: "Leather & Silk",
    style: "Elegant",
  },
];

const galleryItems = [
  { name: "Classic coats", image: coatImage },
  { name: "Luxury fabrics", image: fabricImage },
  { name: "Accessories", image: accessoriesImage },
  { name: "Wristwatch", image: watchImage },
  { name: "Handbags", image: handbagImage },
  { name: "Silk scarves", image: scarfImage },
  { name: "Leather", image: leatherBagImage },
];

const dictionary = [
  {
    term: "Vintage",
    definition: "Fashion inspired by timeless styles from previous generations.",
  },
  {
    term: "Tailoring",
    definition: "The process of designing garments for a refined and perfect fit.",
  },
  {
    term: "Cashmere",
    definition: "A soft luxury fabric valued for warmth and comfort.",
  },
];

function Header({ theme, toggleTheme }) {
  return (
    <header className="site-header" id="top">
      <a className="wordmark" href="#top" aria-label="Royal Classics home">
        <span className="wordmark-crown" aria-hidden="true">R</span>
        <span>
          <strong>ROYAL CLASSICS</strong>
          <small>Timeless Fashion. Modern Grace.</small>
        </span>
      </a>
      <nav className="main-nav" aria-label="Main navigation">
        <a href="#collections">Collections</a>
        <a href="#collection-overview">The edit</a>
        <a href="#wardrobe">Wardrobe planner</a>
        <a href="#contact">Contact</a>
      </nav>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        type="button"
      >
        <span aria-hidden="true">{theme === "light" ? "◐" : "☼"}</span>
        <span>{theme === "light" ? "Evening" : "Daylight"}</span>
      </button>
    </header>
  );
}

function FeaturedHero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">THE ROYAL CLASSICS EDIT · WINTER '26</span>
        <h1>Timeless fashion.<br /><em>Modern grace.</em></h1>
        <p>
          Royal Classics is an online fashion magazine inspired by timeless
          tailoring, luxury fabrics and elegant seasonal fashion. Our
          collections celebrate classic coats, premium materials and refined
          accessories.
        </p>
        <a className="gold-button" href="#collections">
          Explore our collections <span aria-hidden="true">↗</span>
        </a>
        <span className="hero-note">A considered wardrobe, for every season.</span>
      </div>
      <div className="hero-image-wrap">
        <img src={coatImage} alt="The Royal Classics collection of timeless outerwear" />
        <div className="hero-image-caption">
          <span>01 / THE WINTER EDIT</span>
          <span>Made to be kept.</span>
        </div>
      </div>
      <div className="hero-index" aria-hidden="true">RC—26</div>
    </section>
  );
}

function EditorsNote() {
  return (
    <section className="editors-note" aria-label="A note from the editors">
      <span className="quote-mark" aria-hidden="true">“</span>
      <blockquote>
        It is not the palace that makes one royal, but the manner in which one
        carries themselves through it.
      </blockquote>
      <span className="quote-credit">— THE ROYAL CLASSICS EDITORS</span>
    </section>
  );
}

function ImageRibbon() {
  return (
    <section className="image-ribbon" aria-label="Scenes from our collections">
      {galleryItems.map((item, index) => (
        <figure className="ribbon-image" key={item.name}>
          <img src={item.image} alt={item.name} loading="lazy" />
          <figcaption><span>0{index + 1}</span> {item.name}</figcaption>
        </figure>
      ))}
    </section>
  );
}

function CollectionCard({ collection, index }) {
  return (
    <article className="collection-card">
      <div className="collection-image">
        <img src={collection.image} alt={collection.name} loading="lazy" />
        <span className="collection-number">0{index + 1}</span>
      </div>
      <div className="collection-card-content">
        <span className="collection-kicker">THE ROYAL COLLECTION</span>
        <h3>{collection.name}</h3>
        <p>{collection.description}</p>
        <p className="style-tip">“{collection.tip}”</p>
        <div className="collection-card-footer">
          <span>From <strong>{collection.price}</strong></span>
          <a href="#collection-overview" aria-label={`View ${collection.name} collection details`}>
            Discover <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function CollectionsSection() {
  return (
    <>
      <section className="collections-section section-wrap" id="collections">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DRESS FOR WHAT LASTS</span>
            <h2>Explore our <em>collections</em></h2>
          </div>
          <p>Distinctive pieces, chosen for their craft, character and quiet elegance.</p>
        </div>
        <div className="collections-grid">
          {collections.map((collection, index) => (
            <CollectionCard collection={collection} index={index} key={collection.name} />
          ))}
        </div>
      </section>
      <ImageRibbon />
    </>
  );
}

function CollectionOverview() {
  return (
    <section className="editorial-section section-wrap" id="collection-overview">
      <div className="section-heading">
        <div>
          <span className="eyebrow">A CLOSER LOOK</span>
          <h2>Collection <em>overview</em></h2>
        </div>
        <p>Considered materials and enduring style, across the Royal Classics edit.</p>
      </div>
      <div className="table-scroll">
        <table className="collection-table">
          <thead>
            <tr>
              <th scope="col">Collection</th>
              <th scope="col">Season</th>
              <th scope="col">Material</th>
              <th scope="col">Style</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((collection) => (
              <tr key={collection.name}>
                <th scope="row">{collection.name}</th>
                <td>{collection.season}</td>
                <td>{collection.material}</td>
                <td><span className="style-pill">{collection.style}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FashionDictionary() {
  return (
    <section className="dictionary-section">
      <div className="section-wrap">
        <div className="section-heading section-heading-light">
          <div>
            <span className="eyebrow">A FEW WORDS ON STYLE</span>
            <h2>The fashion <em>dictionary</em></h2>
          </div>
          <p>Some of the words behind a wardrobe made to last.</p>
        </div>
        <div className="dictionary-grid">
          {dictionary.map((entry, index) => (
            <article className="dictionary-card" key={entry.term}>
              <span className="dictionary-index">0{index + 1} / GLOSSARY</span>
              <h3>{entry.term}</h3>
              <p>{entry.definition}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WardrobeNotes() {
  return (
    <section className="wardrobe-notes section-wrap">
      <article>
        <span className="eyebrow">THE ROYAL CLASSICS GUIDE</span>
        <h2>How to build a<br /><em>timeless wardrobe</em></h2>
        <ol className="wardrobe-steps">
          <li>
            <span>01</span>
            <div><strong>Choose neutral colours</strong><small>Beige · Brown · Black</small></div>
          </li>
          <li>
            <span>02</span>
            <div><strong>Invest in quality fabrics</strong><small>Cashmere · Wool · Linen</small></div>
          </li>
          <li>
            <span>03</span>
            <div><strong>Keep accessories simple</strong><small>Let thoughtful details speak for themselves.</small></div>
          </li>
        </ol>
      </article>
      <article className="essentials-card">
        <span className="eyebrow">THE FOUNDATION</span>
        <h3>Wardrobe essentials</h3>
        <div className="essential-group">
          <span className="essential-label">ROYAL COLLECTIONS</span>
          <span>Classic Coats</span>
          <span>Long Jackets</span>
        </div>
        <div className="essential-group">
          <span className="essential-label">ACCESSORIES</span>
          <span>Scarves</span>
          <span>Leather Handbags</span>
          <span>Minimal Jewellery</span>
        </div>
        <img src={leatherBagImage} alt="Leather handbag from our accessories edit" loading="lazy" />
      </article>
    </section>
  );
}

function WardrobePlanner() {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("all");
  const [items, setItems] = useState([
    { id: 1, title: "Buy a wool coat", done: false },
    { id: 2, title: "Style a cashmere turtleneck", done: true },
    { id: 3, title: "Pair a silk scarf with a classic coat", done: false },
  ]);
  const visibleItems = items.filter((item) => {
    if (filter === "open") return !item.done;
    if (filter === "done") return item.done;
    return true;
  });
  const completedCount = items.filter((item) => item.done).length;

  const addItem = (event) => {
    event.preventDefault();
    const title = input.trim();
    if (!title) return;
    setItems((currentItems) => [
      ...currentItems,
      { id: Date.now(), title, done: false },
    ]);
    setInput("");
    setFilter("all");
  };

  const toggleItem = (id) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  return (
    <section className="planner-section" id="wardrobe">
      <div className="section-wrap planner-layout">
        <div className="planner-intro">
          <span className="eyebrow">MAKE IT YOUR OWN</span>
          <h2>Your wardrobe,<br /><em>beautifully considered.</em></h2>
          <p>Add the pieces you plan to buy or style, tick them off, and filter your list.</p>
          <div className="planner-counter">
            <span className="counter-number">{String(completedCount).padStart(2, "0")}</span>
            <span>of {String(items.length).padStart(2, "0")} pieces<br />considered</span>
          </div>
        </div>
        <div className="planner-panel">
          <div className="planner-panel-heading">
            <div>
              <span className="eyebrow">PERSONAL STYLE NOTES</span>
              <h3>Wardrobe planner</h3>
            </div>
            <span className="planner-seal" aria-hidden="true">RC</span>
          </div>
          <form className="planner-form" onSubmit={addItem}>
            <label className="sr-only" htmlFor="wardrobe-item">Add a wardrobe piece</label>
            <input
              id="wardrobe-item"
              type="text"
              placeholder="e.g. Buy a wool coat"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <button type="submit">Add piece <span aria-hidden="true">＋</span></button>
          </form>
          <div className="planner-filters" aria-label="Filter wardrobe pieces">
            {["all", "open", "done"].map((filterOption) => (
              <button
                className={filter === filterOption ? "filter-button active" : "filter-button"}
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                type="button"
                aria-pressed={filter === filterOption}
              >
                {filterOption === "all" ? "All pieces" : filterOption === "open" ? "To style" : "Completed"}
              </button>
            ))}
          </div>
          <ul className="planner-list">
            {visibleItems.length === 0 ? (
              <li className="planner-empty">
                {filter === "done" ? "No pieces completed yet." : "Your wardrobe notes are all caught up."}
              </li>
            ) : visibleItems.map((item) => (
              <li className={item.done ? "planner-item done" : "planner-item"} key={item.id}>
                <label className="planner-item-label">
                  <input
                    checked={item.done}
                    onChange={() => toggleItem(item.id)}
                    type="checkbox"
                  />
                  <span className="planner-checkbox" aria-hidden="true">{item.done ? "✓" : ""}</span>
                  <span>{item.title}</span>
                </label>
                <button
                  className="planner-delete"
                  onClick={() => deleteItem(item.id)}
                  type="button"
                  aria-label={`Remove ${item.title}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SubscriptionSection() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const subscribe = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setMessage("Thank you for joining the Royal Classics fashion community.");
    setEmail("");
  };

  return (
    <section className="subscription-section" id="subscription">
      <div className="subscription-mark" aria-hidden="true">R</div>
      <span className="eyebrow">A LETTER FROM ROYAL CLASSICS</span>
      <h2>Elegance, delivered.</h2>
      <p>Join our fashion community and stay updated with the latest collections, trends and classic fashion inspiration.</p>
      <form className="subscription-form" onSubmit={subscribe}>
        <label className="sr-only" htmlFor="subscribe-email">Your email address</label>
        <input
          autoComplete="email"
          id="subscribe-email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          type="email"
          value={email}
        />
        <button type="submit">Join the list <span aria-hidden="true">→</span></button>
      </form>
      <p className="subscription-message" aria-live="polite">{message}</p>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-main">
        <a className="footer-brand" href="#top">ROYAL CLASSICS</a>
        <p>Inspired by timeless fashion and elegant craftsmanship.</p>
        <div className="footer-contact">
          <a href="mailto:hello@royalclassics.com">hello@royalclassics.com</a>
          <a href="tel:+911234567890">+91 12345 67890</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Royal Classics. All Rights Reserved.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div className={`app-root ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <FeaturedHero />
        <EditorsNote />
        <CollectionsSection />
        <CollectionOverview />
        <FashionDictionary />
        <WardrobeNotes />
        <WardrobePlanner />
        <SubscriptionSection />
      </main>
      <Footer />
    </div>
  );
}
