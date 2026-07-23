/* =========================================================================
   RATIO-BAR.JS
   -------------------------------------------------------------------------
   Builds the site's "signature" visual: a horizontal bar that shows the
   proportion of each liquid ingredient in a cocktail, coloured by type
   (spirit / modifier / citrus / other).

   Kept in its own file because it's used by cocktail-detail.js and is a
   self-contained little piece of logic - a good example of how splitting
   code into small, single-purpose files keeps things easy to find later.

   HOW IT WORKS:
   1. We only look at ingredients measured in "oz" (dashes of bitters etc.
      don't have a meaningful volume, so they're left out of the bar).
   2. We add up the total ounces.
   3. For each ingredient, its percentage of the bar = its amount / total.
   4. We create one <div> per ingredient, sized with that percentage, and
      coloured according to its "type" using the INGREDIENT_TYPES lookup
      from data.js.
   ========================================================================= */

function buildRatioBar(ingredients, barEl, legendEl) {
  // Only include ingredients measured in ounces - that's what makes a
  // meaningful visual ratio. Dashes/twists/etc are skipped.
  const measured = ingredients.filter((ing) => ing.unit === "oz");
  const total = measured.reduce((sum, ing) => sum + ing.amount, 0);

  // Clear out any previous content (useful if this ever gets re-rendered).
  barEl.innerHTML = "";
  legendEl.innerHTML = "";

  // Track which ingredient types we've already added to the legend so we
  // don't show "Base spirit" twice if a drink had two spirits.
  const seenTypes = new Set();

  measured.forEach((ing) => {
    const percent = (ing.amount / total) * 100;
    const typeInfo = INGREDIENT_TYPES[ing.type] || INGREDIENT_TYPES.other;

    // Build the coloured segment for the bar itself.
    const segment = document.createElement("div");
    segment.className = "ratio-segment";
    segment.style.width = percent + "%";
    segment.style.background = typeInfo.color;
    segment.title = `${ing.name}: ${ing.amount} oz`;
    barEl.appendChild(segment);

    // Add one legend entry per ingredient TYPE (not per ingredient).
    if (!seenTypes.has(ing.type)) {
      seenTypes.add(ing.type);
      const legendItem = document.createElement("span");
      legendItem.innerHTML = `<span class="dot" style="background:${typeInfo.color}"></span>${typeInfo.label}`;
      legendEl.appendChild(legendItem);
    }
  });
}
