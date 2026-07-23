/* =========================================================================
   HOME.JS
   -------------------------------------------------------------------------
   Renders the "Featured classics" cards on index.html. This is the
   simplest of the rendering scripts on the site - a good one to read
   first before looking at cocktails.js or cocktail-detail.js.

   THE PATTERN (you'll see this repeated across the site):
   1. Find the empty container in the HTML (id="featured-grid").
   2. Build a string of HTML for each item of data.
   3. Drop that string into the container with .innerHTML.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("featured-grid");

  // Just show the first 3 cocktails from data.js as "featured".
  const featured = COCKTAILS.slice(0, 3);

  featured.forEach((cocktail) => {
    const card = document.createElement("div");
    card.className = "cocktail-card";
    card.innerHTML = `
      <div class="card-illustration">${renderGlassIllustration(cocktail)}</div>
      <a class="card-title" href="cocktail.html?slug=${cocktail.slug}">${cocktail.name}</a>
      <div class="meta">${cocktail.baseSpirit} · ${cocktail.category}</div>
    `;
    grid.appendChild(card);
  });
});
