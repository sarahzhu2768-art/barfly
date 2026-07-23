/* =========================================================================
   COCKTAILS.JS
   -------------------------------------------------------------------------
   Powers cocktails.html: builds the filter buttons, renders the card grid,
   and re-renders the grid whenever a filter button is clicked.

   KEY IDEA: "state" and "render" are separate.
   `activeFilter` is a variable that holds what's currently selected.
   `render()` is a function that looks at that variable and redraws the
   grid to match. Whenever something changes (a button click), we update
   the variable and then call render() again. This pattern - state,
   then a function that renders based on state - is the core idea behind
   every JavaScript framework (React, Vue, etc), just done by hand here.
   ========================================================================= */

let activeFilter = "All";

document.addEventListener("DOMContentLoaded", () => {
  buildFilterBar();
  render();
});

function buildFilterBar() {
  const filterBar = document.getElementById("filter-bar");

  // Build a unique, sorted list of base spirits from the cocktail data,
  // e.g. ["Gin", "Rum", "Tequila", "Whiskey"], with "All" pinned first.
  const spirits = ["All", ...new Set(COCKTAILS.map((c) => c.baseSpirit))].sort(
    (a, b) => (a === "All" ? -1 : a.localeCompare(b))
  );

  spirits.forEach((spirit) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn" + (spirit === "All" ? " active" : "");
    btn.textContent = spirit;
    btn.addEventListener("click", () => {
      activeFilter = spirit;

      // Move the "active" class to whichever button was just clicked.
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      render();
    });
    filterBar.appendChild(btn);
  });
}

function render() {
  const grid = document.getElementById("cocktail-grid");
  grid.innerHTML = "";

  const list = activeFilter === "All"
    ? COCKTAILS
    : COCKTAILS.filter((c) => c.baseSpirit === activeFilter);

  list.forEach((cocktail) => {
    const card = document.createElement("div");
    card.className = "cocktail-card";
    card.innerHTML = `
      <div class="card-illustration">${renderGlassIllustration(cocktail)}</div>
      <a class="card-title" href="cocktail.html?slug=${cocktail.slug}">${cocktail.name}</a>
      <div class="meta">${cocktail.baseSpirit} · ${cocktail.category}</div>
      <div class="meta">${cocktail.era}</div>
    `;
    grid.appendChild(card);
  });
}
