/* =========================================================================
   ILLUSTRATION.JS
   -------------------------------------------------------------------------
   Builds the little glass illustration that appears on every cocktail card
   and at the top of every cocktail detail page. This is entirely drawn
   with SVG shapes (ellipses, rectangles, lines) - no image files at all.

   WHY SVG INSTEAD OF A DRAWN/PHOTOGRAPHED IMAGE?
   - It's just code, so it's a few hundred bytes instead of a large image
     file - the whole site stays fast.
   - It's colour-driven: change `liquidColor` on a cocktail in data.js and
     the illustration updates itself, same as the ratio bar does.
   - It scales to any size with zero blur, from a tiny card thumbnail up
     to the big version on the detail page.

   HOW IT'S BUILT (read top to bottom of the SVG markup below):
   1. A trapezoid glass outline (a simple wide-mouth glass shape).
   2. A "liquid" rectangle, clipped to the glass shape, filled with the
      cocktail's `liquidColor` from data.js.
   3. A small circle at the rim in `garnishColor` - a simplified stand-in
      for whatever garnish the drink actually uses.
   4. A small butterfly, built from four overlapping ellipses plus a body
      line and antennae - this is the site's recurring signature mark,
      appearing on every single drink illustration.

   `clipPathId` has to be unique per illustration on the page (you can't
   reuse the same id twice in one HTML document), so we pass in the
   cocktail's slug and use that.
   ========================================================================= */

function renderGlassIllustration(cocktail) {
  const clipId = "glass-clip-" + cocktail.slug;

  return `
    <svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${cocktail.name} illustration">
      <defs>
        <clipPath id="${clipId}">
          <path d="M50,40 L110,40 L100,170 L60,170 Z" />
        </clipPath>
      </defs>

      <!-- Glass outline -->
      <path d="M50,40 L110,40 L100,170 L60,170 Z"
            fill="none" stroke="var(--ink)" stroke-width="2" opacity="0.55" />
      <ellipse cx="80" cy="40" rx="30" ry="5" fill="none" stroke="var(--ink)" stroke-width="2" opacity="0.55" />

      <!-- Liquid fill, clipped so it stays inside the glass shape -->
      <g clip-path="url(#${clipId})">
        <rect x="45" y="95" width="70" height="85" fill="${cocktail.liquidColor}" />
      </g>

      <!-- Garnish accent at the rim -->
      <circle cx="103" cy="46" r="6" fill="${cocktail.garnishColor}" />

      <!-- Butterfly sticker - the site's recurring signature mark -->
      <g transform="translate(122,152)">
        <ellipse cx="-6" cy="-4" rx="8" ry="5.5" fill="var(--brass)" opacity="0.9" transform="rotate(-20 -6 -4)" />
        <ellipse cx="6" cy="-4" rx="8" ry="5.5" fill="var(--brass)" opacity="0.9" transform="rotate(20 6 -4)" />
        <ellipse cx="-5" cy="5" rx="5.5" ry="4.5" fill="var(--rust)" opacity="0.9" transform="rotate(-15 -5 5)" />
        <ellipse cx="5" cy="5" rx="5.5" ry="4.5" fill="var(--rust)" opacity="0.9" transform="rotate(15 5 5)" />
        <line x1="0" y1="-9" x2="0" y2="9" stroke="var(--ink)" stroke-width="1.5" />
        <line x1="0" y1="-9" x2="-4" y2="-13" stroke="var(--ink)" stroke-width="1" />
        <line x1="0" y1="-9" x2="4" y2="-13" stroke="var(--ink)" stroke-width="1" />
      </g>
    </svg>
  `;
}
