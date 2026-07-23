/* =========================================================================
   COCKTAIL-DETAIL.JS
   -------------------------------------------------------------------------
   This is the most "advanced" script on the site, and the most important
   one to understand, because it's the one doing the real templating work:
   ONE html file (cocktail.html) becomes SIX different pages depending on
   which slug is in the URL.

   STEP BY STEP:
   1. Read the URL, e.g. "cocktail.html?slug=negroni"
   2. Pull out the value of "slug" ("negroni")
   3. Search COCKTAILS (from data.js) for the object whose .slug matches
   4. Build a big chunk of HTML using that object's data
   5. Drop it into the page
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // URLSearchParams is a built-in browser tool for reading query strings
  // (the part of a URL after the "?"). window.location.search gives us
  // that raw string, e.g. "?slug=negroni".
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  const cocktail = COCKTAILS.find((c) => c.slug === slug);
  const container = document.getElementById("cocktail-content");

  // Handle the "someone typed a bad URL" case gracefully instead of just
  // showing a blank page.
  if (!cocktail) {
    container.innerHTML = `
      <p class="eyebrow">Not found</p>
      <h1>We don't have that one yet</h1>
      <p>Try browsing the <a href="cocktails.html">full list of cocktails</a> instead.</p>
    `;
    return;
  }

  document.getElementById("page-title").textContent = `${cocktail.name} — Barfly`;
  renderCocktail(cocktail, container);
});

function renderCocktail(cocktail, container) {
  // Build the ingredient list HTML. Each ingredient LINKS to its own
  // ingredients.html#slug entry if we have data on it, connecting the two
  // content types together.
  const ingredientRows = cocktail.ingredients.map((ing) => {
    const matchingIngredient = INGREDIENTS.find(
      (i) => i.name.toLowerCase() === ing.name.toLowerCase().split(" (")[0].toLowerCase()
             || ing.name.toLowerCase().includes(i.name.toLowerCase())
    );
    const nameHtml = matchingIngredient
      ? `<a href="ingredients.html#${matchingIngredient.slug}">${ing.name}</a>`
      : ing.name;

    return `
      <li>
        <span>${nameHtml}</span>
        <span class="amount">${ing.amount} ${ing.unit}</span>
      </li>
    `;
  }).join("");

  const methodSteps = cocktail.method.map((step) => `<li>${step}</li>`).join("");

  container.innerHTML = `
    <div class="cocktail-head">
      <div class="detail-illustration">${renderGlassIllustration(cocktail)}</div>
      <p class="eyebrow">${cocktail.category}</p>
      <h1>${cocktail.name}</h1>

      <div class="ratio-bar" id="ratio-bar"></div>
      <div class="ratio-legend" id="ratio-legend"></div>

      <dl class="spec-grid">
        <div><dt>Base spirit</dt><dd>${cocktail.baseSpirit}</dd></div>
        <div><dt>Glass</dt><dd>${cocktail.glass}</dd></div>
        <div><dt>Garnish</dt><dd>${cocktail.garnish}</dd></div>
        <div><dt>Era</dt><dd>${cocktail.era}</dd></div>
        <div><dt>Difficulty</dt><dd>${cocktail.difficulty}</dd></div>
      </dl>
    </div>

    <div class="two-col">
      <div>
        <h3>Ingredients</h3>
        <ul class="ingredient-list">${ingredientRows}</ul>
      </div>
      <div>
        <h3>Method</h3>
        <ol class="method-list">${methodSteps}</ol>
      </div>
    </div>

    <div class="history-block">
      <h3>History</h3>
      <p>${cocktail.history}</p>
    </div>
  `;

  // The ratio bar needs actual DOM elements to draw into, so we build it
  // AFTER the HTML above has been inserted into the page.
  const barEl = document.getElementById("ratio-bar");
  const legendEl = document.getElementById("ratio-legend");
  buildRatioBar(cocktail.ingredients, barEl, legendEl);
}
