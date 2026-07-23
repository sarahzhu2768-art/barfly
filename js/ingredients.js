/* =========================================================================
   INGREDIENTS.JS
   -------------------------------------------------------------------------
   Renders one card per ingredient in INGREDIENTS (data.js), and for each
   one, works out which cocktails use it by searching through COCKTAILS.

   This is the clearest example on the site of why keeping data separate
   from pages is powerful: nothing here is hard-coded ("Gin is used in
   Negroni and Martini") - it's calculated fresh from the two data arrays
   every time the page loads. Add a 7th cocktail using gin, and this list
   updates itself with zero changes to this file.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("ingredient-list");

  INGREDIENTS.forEach((ingredient) => {
    // Find every cocktail whose ingredients list includes this ingredient.
    // We compare with .includes() in both directions (loosely) since
    // cocktail data sometimes has slightly fuller names, e.g.
    // "Tequila (blanco)" in a cocktail vs "Tequila (Blanco)" as the
    // ingredient's own name.
    const usedIn = COCKTAILS.filter((cocktail) =>
      cocktail.ingredients.some((ing) =>
        ing.name.toLowerCase().includes(ingredient.name.toLowerCase().split(" (")[0].toLowerCase())
      )
    );

    const usedInLinks = usedIn
      .map((c) => `<a href="cocktail.html?slug=${c.slug}">${c.name}</a>`)
      .join(", ");

    const card = document.createElement("div");
    card.className = "ingredient-detail-card";
    card.id = ingredient.slug; // enables links like ingredients.html#gin
    card.innerHTML = `
      <span class="tag">${INGREDIENT_TYPES[ingredient.type].label}</span>
      <h3>${ingredient.name}</h3>
      <p>${ingredient.description}</p>
      <div class="used-in">Used in: ${usedInLinks || "—"}</div>
    `;
    list.appendChild(card);
  });
});
