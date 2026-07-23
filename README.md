# Barfly — starter cocktail site

A small, plain HTML/CSS/JavaScript website about classic cocktails. No build
tools, no frameworks, no installs required — just open a file in a browser.

## How to run it

Double-click `index.html` (or right-click → Open With → your browser). Every
page links to the others with normal relative paths, so it works straight
from the folder — no local server needed.

If you later want to run a local server anyway (some browsers are picky
about `file://` links), and you have Python installed:

```
cd cocktail-classics
python3 -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Folder structure

```
cocktail-classics/
├── index.html            Home page
├── cocktails.html         Grid of all cocktails, with spirit filters
├── cocktail.html          ONE template page for every single cocktail
├── ingredients.html       Ingredient reference, cross-linked to cocktails
├── css/
│   └── style.css         All styling, colours, fonts, layout
└── js/
    ├── data.js            All the actual content (cocktails + ingredients)
    ├── main.js            Shared: highlights the current page in the nav
    ├── home.js            Renders the featured cards on index.html
    ├── cocktails.js       Renders + filters the grid on cocktails.html
    ├── cocktail-detail.js Renders a single cocktail on cocktail.html
    ├── ratio-bar.js       Builds the ingredient ratio bar visual
    └── ingredients.js     Renders the ingredient cards
```

## The most important idea on this site

`cocktail.html` is a single, empty template. There is no "negroni.html" or
"martini.html" file anywhere. Instead:

1. You click a cocktail card, which links to `cocktail.html?slug=negroni`
2. `cocktail-detail.js` reads `slug=negroni` out of the URL
3. It searches the `COCKTAILS` array in `data.js` for the entry whose
   `slug` is `"negroni"`
4. It builds the whole page's HTML from that one object and inserts it

This is called a **data-driven** page, and it's the single most useful
pattern to take away from this project — it's how almost every real
website handles product pages, blog posts, user profiles, and so on.

## How to add a new cocktail

Open `js/data.js`, find the `COCKTAILS` array, copy one of the objects
inside it, paste it before the closing `]`, and edit the fields:

```js
{
  slug: "gimlet",               // lowercase, dashes for spaces, must be unique
  name: "Gimlet",
  category: "Shaken, sour",
  baseSpirit: "Gin",
  era: "Early 1900s, Royal Navy",
  glass: "Coupe",
  garnish: "Lime wheel",
  difficulty: "Easy",
  ingredients: [
    { name: "Gin", amount: 2, unit: "oz", type: "spirit" },
    { name: "Lime Juice", amount: 0.75, unit: "oz", type: "citrus" },
    { name: "Simple Syrup", amount: 0.5, unit: "oz", type: "citrus" }
  ],
  method: [
    "Add all ingredients to a shaker with ice.",
    "Shake hard, then double-strain into a chilled coupe."
  ],
  history: "A sentence or two about where the drink came from."
}
```

Save the file, refresh `cocktails.html` in your browser — it'll appear in
the grid, in the right filter category, automatically.

## Where to go next (as you learn more)

- **Add more cocktails and ingredients** — the fastest way to make the
  site feel real. Try adding bar/regional info as a new field on each
  cocktail (e.g. `originBar: "Dukes Bar, London"`), then build a bars
  index page the same way `ingredients.html` works.
- **Add a search box** — filter the grid by typing a cocktail name, using
  the same `render()` pattern already in `cocktails.js`.
- **Learn `localStorage`** — let visitors "star" favourite cocktails and
  have that persist between visits (note: this only works on a real
  website, not inside the Claude.ai artifact preview).
- **Move to a framework once this feels limiting** — everything you've
  practiced here (data → render, event listeners, template strings) maps
  directly onto React, Vue, or similar. Nothing here is wasted effort.
