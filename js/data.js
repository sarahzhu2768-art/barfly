/* =========================================================================
   DATA.JS
   -------------------------------------------------------------------------
   This is the "database" for the whole site. Every cocktail and every
   ingredient lives here as a plain JavaScript object inside an array.

   WHY DO IT THIS WAY?
   Instead of writing a separate HTML page for every cocktail (imagine doing
   that for 100 drinks...), we write ONE template page (cocktail.html) and
   one script (cocktail-detail.js) that reads a cocktail's data from here
   and builds the page automatically. This is called a "data-driven" site,
   and it's how almost every real website works (the data usually comes
   from a database instead of a file like this, but the idea is identical).

   HOW TO ADD A NEW COCKTAIL:
   Copy one of the objects in the COCKTAILS array below, paste it at the
   end (before the closing "]"), and change the values. As long as the
   "slug" is unique and url-friendly (lowercase, dashes instead of spaces),
   everything else on the site will pick it up automatically — the grid,
   the filters, and the ingredient cross-links.
   ========================================================================= */

/* Ingredient "type" controls the colour of its segment in the ratio bar
   on each cocktail page. Keep to these four so the legend stays simple. */
const INGREDIENT_TYPES = {
  spirit: { label: "Base spirit", color: "#B98A2E" },   // brass
  modifier: { label: "Modifier / liqueur", color: "#A0432B" }, // rust
  citrus: { label: "Citrus / sweetener", color: "#6E7F63" },   // sage
  other: { label: "Other", color: "#8C8272" }           // stone grey
};

const COCKTAILS = [
  {
    slug: "negroni",
    name: "Negroni",
    category: "Stirred, spirit-forward",
    baseSpirit: "Gin",
    era: "1919, Florence, Italy",
    glass: "Rocks glass, over ice",
    garnish: "Orange peel",
    liquidColor: "#A0432B",
    garnishColor: "#D98A3D",
    difficulty: "Easy",
    ingredients: [
      { name: "Gin", amount: 1, unit: "oz", type: "spirit" },
      { name: "Sweet Vermouth", amount: 1, unit: "oz", type: "modifier" },
      { name: "Campari", amount: 1, unit: "oz", type: "modifier" }
    ],
    method: [
      "Fill a mixing glass with ice.",
      "Add the gin, sweet vermouth, and Campari.",
      "Stir for about 20-30 seconds, until well chilled.",
      "Strain into a rocks glass over a large ice cube.",
      "Express an orange peel over the top and drop it in."
    ],
    history: "The Negroni is said to have been invented in 1919 at Caffè Casoni in Florence, when Count Camillo Negroni asked the bartender to strengthen his favourite Americano by swapping the soda water for gin. The bartender marked the change with an orange garnish instead of the Americano's usual lemon, and a classic was born. Equal parts is the whole idea here: nothing dominates, and that balance is exactly why it's such a good drink to learn ratios from."
  },
  {
    slug: "old-fashioned",
    name: "Old Fashioned",
    category: "Stirred, spirit-forward",
    baseSpirit: "Whiskey",
    era: "Early 1800s, United States",
    glass: "Rocks glass, over one large ice cube",
    garnish: "Orange peel",
    liquidColor: "#B98A2E",
    garnishColor: "#D98A3D",
    difficulty: "Easy",
    ingredients: [
      { name: "Bourbon or Rye Whiskey", amount: 2, unit: "oz", type: "spirit" },
      { name: "Simple Syrup", amount: 0.25, unit: "oz", type: "citrus" },
      { name: "Angostura Bitters", amount: 2, unit: "dash", type: "other" }
    ],
    method: [
      "Add the simple syrup and bitters to a rocks glass.",
      "Add the whiskey and stir briefly to combine.",
      "Add one large ice cube.",
      "Stir for about 20 seconds until chilled and slightly diluted.",
      "Express an orange peel over the top and drop it in."
    ],
    history: "The Old Fashioned is essentially the original definition of the word \"cocktail\" from the early 1800s: spirit, sugar, water (ice), and bitters. Its name comes from patrons in the late 1800s asking bartenders to make their drink the \"old-fashioned\" way, without the newer fruit-and-liqueur trends of the day. It's often the first drink bartenders teach new hires, because it's really a lesson in dilution and balance rather than a long ingredient list."
  },
  {
    slug: "daiquiri",
    name: "Daiquiri",
    category: "Shaken, sour",
    baseSpirit: "Rum",
    era: "Late 1800s, Cuba",
    glass: "Coupe",
    garnish: "None, or a lime wheel",
    liquidColor: "#E8D9A0",
    garnishColor: "#7C8B6F",
    difficulty: "Easy",
    ingredients: [
      { name: "White Rum", amount: 2, unit: "oz", type: "spirit" },
      { name: "Lime Juice", amount: 1, unit: "oz", type: "citrus" },
      { name: "Simple Syrup", amount: 0.75, unit: "oz", type: "citrus" }
    ],
    method: [
      "Add all ingredients to a shaker with ice.",
      "Shake hard for about 10-15 seconds, until very cold.",
      "Double-strain into a chilled coupe glass.",
      "Serve up, with no ice."
    ],
    history: "Named after a small mining town near Santiago, Cuba, the Daiquiri is credited to American engineer Jennings Cox in the late 1800s, who mixed local rum with lime and sugar when he ran out of gin. It's the template for almost every \"sour\" cocktail that followed: spirit, citrus, sweetener, shaken and strained. Once you can make a good Daiquiri, you understand the sour category."
  },
  {
    slug: "martini",
    name: "Martini",
    category: "Stirred, spirit-forward",
    baseSpirit: "Gin",
    era: "Late 1800s, United States",
    glass: "Martini (cocktail) glass",
    garnish: "Lemon twist or olives",
    liquidColor: "#DCE3D3",
    garnishColor: "#6E7F63",
    difficulty: "Easy",
    ingredients: [
      { name: "Gin", amount: 2.5, unit: "oz", type: "spirit" },
      { name: "Dry Vermouth", amount: 0.5, unit: "oz", type: "modifier" }
    ],
    method: [
      "Fill a mixing glass with ice.",
      "Add the gin and dry vermouth.",
      "Stir for about 30 seconds, until well chilled.",
      "Strain into a chilled martini glass.",
      "Garnish with a lemon twist, or olives on a pick."
    ],
    history: "The exact origin of the Martini is genuinely disputed — candidates include a drink called the Martinez served in San Francisco in the 1860s-70s, and various New York hotel bars in the 1880s-1900s. What's clear is that the ratio of gin to vermouth has drifted drier and drier over the last century; a 2:1 or 3:1 ratio like this one is now considered classic, though some drinkers go much drier still."
  },
  {
    slug: "margarita",
    name: "Margarita",
    category: "Shaken, sour",
    baseSpirit: "Tequila",
    era: "1930s-40s, Mexico/United States border",
    glass: "Rocks glass, salted rim optional",
    garnish: "Lime wheel",
    liquidColor: "#C9D18A",
    garnishColor: "#7C8B6F",
    difficulty: "Easy",
    ingredients: [
      { name: "Tequila (blanco)", amount: 2, unit: "oz", type: "spirit" },
      { name: "Triple Sec / Cointreau", amount: 1, unit: "oz", type: "modifier" },
      { name: "Lime Juice", amount: 1, unit: "oz", type: "citrus" }
    ],
    method: [
      "Optional: rub a lime wedge around the rim of a rocks glass and dip it in salt.",
      "Add all ingredients to a shaker with ice.",
      "Shake hard for 10-15 seconds until very cold.",
      "Strain into the glass over fresh ice."
    ],
    history: "Like a lot of classic drinks, several bartenders on both sides of the US-Mexico border claim to have invented the Margarita in the 1930s and 40s, and none of the stories can be confirmed. What's not in dispute is the shape of the drink: it's essentially a tequila Daiquiri with orange liqueur added, which is why learning the Daiquiri first makes the Margarita easy."
  },
  {
    slug: "manhattan",
    name: "Manhattan",
    category: "Stirred, spirit-forward",
    baseSpirit: "Whiskey",
    era: "1870s-80s, New York City",
    glass: "Coupe",
    garnish: "Brandied cherry",
    liquidColor: "#8C3A24",
    garnishColor: "#8C1F1B",
    difficulty: "Easy",
    ingredients: [
      { name: "Rye Whiskey", amount: 2, unit: "oz", type: "spirit" },
      { name: "Sweet Vermouth", amount: 1, unit: "oz", type: "modifier" },
      { name: "Angostura Bitters", amount: 2, unit: "dash", type: "other" }
    ],
    method: [
      "Fill a mixing glass with ice.",
      "Add the rye, sweet vermouth, and bitters.",
      "Stir for about 30 seconds, until well chilled.",
      "Strain into a chilled coupe glass.",
      "Garnish with a brandied cherry."
    ],
    history: "The Manhattan's exact birth story is disputed, but the strongest evidence points to bars in New York City in the 1870s-80s, around the same time the Old Fashioned was being codified. Swap the whiskey for gin and you basically get a Martinez; swap the whiskey for tequila and you get a close cousin of a Rob Roy (which itself is a Manhattan made with Scotch). It's a good drink for noticing how one ingredient swap changes an entire family of cocktails."
  },
  {
    slug: "cosmopolitan",
    name: "Cosmopolitan",
    category: "Shaken, sour",
    baseSpirit: "Vodka",
    era: "1980s-90s, United States",
    glass: "Coupe or martini glass",
    garnish: "Orange twist or lime wheel",
    liquidColor: "#C96A85",
    garnishColor: "#D98A3D",
    difficulty: "Easy",
    ingredients: [
      { name: "Citrus Vodka", amount: 1.5, unit: "oz", type: "spirit" },
      { name: "Triple Sec / Cointreau", amount: 0.5, unit: "oz", type: "modifier" },
      { name: "Cranberry Juice", amount: 0.5, unit: "oz", type: "citrus" },
      { name: "Lime Juice", amount: 0.25, unit: "oz", type: "citrus" }
    ],
    method: [
      "Add all ingredients to a shaker with ice.",
      "Shake hard for about 10-15 seconds, until very cold.",
      "Double-strain into a chilled coupe or martini glass.",
      "Garnish with an orange twist, or a lime wheel."
    ],
    history: "Like a lot of drinks from the 1980s cocktail revival, the Cosmopolitan's exact inventor is disputed, with several New York and Miami bartenders each claiming an early version around the same time. What's not disputed is how it became famous: its recurring role on Sex and the City in the late 1990s turned it into the defining order of a whole era of cocktail bars, for better or worse. Underneath the reputation, it's really just a vodka Daiquiri with orange liqueur and a splash of cranberry for colour and tartness — a good reminder that a drink's fame and its complexity aren't the same thing."
  }
];

const INGREDIENTS = [
  {
    slug: "gin",
    name: "Gin",
    type: "spirit",
    summary: "A clear spirit redistilled with botanicals, always including juniper berries as the defining flavour.",
    description: "Gin starts life as a neutral grain spirit, then is redistilled with a mix of botanicals — juniper is the one ingredient every gin must contain, alongside things like coriander, citrus peel, and angelica root. London Dry is the driest, most juniper-forward style; more modern \"New Western\" gins lean on other botanicals and can taste closer to a flavoured vodka."
  },
  {
    slug: "whiskey",
    name: "Whiskey (Bourbon & Rye)",
    type: "spirit",
    summary: "A grain spirit aged in wood barrels. Bourbon leans sweet and corn-forward; rye is spicier and drier.",
    description: "Both are made from a mash of grains and aged in oak, but the recipe differs: bourbon must be at least 51% corn, giving it a rounder, sweeter profile, while rye must be at least 51% rye grain, giving it a spicier, drier edge. Either works in most classic whiskey cocktails, but the choice noticeably shifts the drink's character."
  },
  {
    slug: "white-rum",
    name: "White Rum",
    type: "spirit",
    summary: "A light, usually unaged or lightly filtered rum distilled from sugarcane or molasses.",
    description: "White (or \"light\") rum is typically aged briefly then filtered to remove colour, giving a cleaner, lighter profile than gold or dark rum. It's the standard base for the Daiquiri and most tiki-style sours because it lets the citrus and sugar shine rather than competing with heavy barrel flavour."
  },
  {
    slug: "tequila",
    name: "Tequila (Blanco)",
    type: "spirit",
    summary: "A spirit distilled from the blue agave plant, grown almost exclusively around Jalisco, Mexico.",
    description: "Blanco (\"silver\" or \"white\") tequila is unaged or aged under two months, giving a peppery, vegetal, agave-forward taste. Aged styles (reposado, añejo) pick up vanilla and oak notes from barrel time, but blanco is the standard choice for a Margarita because its sharper edge holds up against citrus and orange liqueur."
  },
  {
    slug: "sweet-vermouth",
    name: "Sweet Vermouth",
    type: "modifier",
    summary: "A fortified, aromatized wine with a reddish colour and notes of dried fruit, caramel, and spice.",
    description: "Vermouth is wine fortified with a neutral spirit and infused with botanicals. The sweet (\"Italian\") style is coloured and sugared, giving classics like the Negroni and Manhattan their rounder, slightly bitter-sweet backbone. Once opened, keep it in the fridge — it's wine, and it goes flat and dull on the counter within a couple of weeks."
  },
  {
    slug: "dry-vermouth",
    name: "Dry Vermouth",
    type: "modifier",
    summary: "A pale, dry, herbal fortified wine — the traditional partner to gin in a Martini.",
    description: "The dry (\"French\") style of vermouth skips the added sugar and colour, staying pale and crisp with herbal, slightly bitter notes. Like sweet vermouth, it's a wine product and should be refrigerated after opening and used within a few weeks for the best flavour."
  },
  {
    slug: "campari",
    name: "Campari",
    type: "modifier",
    summary: "A bright red Italian bitter liqueur with an intensely bitter-orange flavour.",
    description: "Campari is an amaro (bitter liqueur) made from a secret blend of herbs, fruit peels, and botanicals. Its bracing bitterness is the whole point of the Negroni — it's meant to cut against the gin and vermouth rather than blend in quietly."
  },
  {
    slug: "triple-sec",
    name: "Triple Sec / Cointreau",
    type: "modifier",
    summary: "A clear, orange-flavoured liqueur made from the peels of both sweet and bitter oranges.",
    description: "\"Triple sec\" is a style of orange liqueur; Cointreau is the best-known (and more expensive) brand-name version, prized for its cleaner, less syrupy sweetness. It shows up anywhere a cocktail needs an orange note with some sweetness and alcohol behind it, most famously the Margarita."
  },
  {
    slug: "simple-syrup",
    name: "Simple Syrup",
    type: "citrus",
    summary: "Equal parts sugar and water, heated until dissolved. The easiest way to add sweetness to a cocktail.",
    description: "Simple syrup is just sugar dissolved into water (usually 1:1 by volume), used instead of dry sugar because it blends instantly into a cold drink. It's the easiest thing on this list to make yourself: warm equal parts white sugar and water on the stove, stirring until the sugar disappears, then let it cool. Keeps in the fridge for a few weeks."
  },
  {
    slug: "lime-juice",
    name: "Lime Juice",
    type: "citrus",
    summary: "Fresh-squeezed lime juice — the backbone of most rum and tequila sours.",
    description: "Always use fresh-squeezed juice rather than bottled lime juice if you can; the difference in a Daiquiri or Margarita is significant, since bottled juice loses its bright top notes within days of being pressed. One regular lime yields roughly 1 oz of juice."
  },
  {
    slug: "citrus-vodka",
    name: "Citrus Vodka",
    type: "spirit",
    summary: "A neutral grain spirit infused with citrus peel, giving a cleaner edge than plain vodka.",
    description: "Vodka is designed to be as neutral and flavourless as possible; the citrus-infused style adds a light lemon or orange note back in through the peel during production. It's the traditional choice for a Cosmopolitan, though plain vodka works fine too if that's what's in your freezer."
  },
  {
    slug: "cranberry-juice",
    name: "Cranberry Juice",
    type: "citrus",
    summary: "Tart, deep-red juice used more for its colour and sharp edge than for real sweetness.",
    description: "In a Cosmopolitan, cranberry juice isn't there to make the drink fruity-sweet — it's there for its tartness and its colour, giving the drink its signature pale pink hue. Unsweetened ('pure') cranberry juice is far more sour than the cocktail-mixer versions sold in most supermarkets, so taste and adjust before committing to a bottle."
  },
  {
    slug: "angostura-bitters",
    name: "Angostura Bitters",
    type: "other",
    summary: "A concentrated, intensely aromatic blend of botanicals, used in small \"dash\" amounts to season a drink.",
    description: "Bitters work like a spice rack for cocktails — a dash or two doesn't make a drink taste bitter, it adds depth and ties the other flavours together, the way a pinch of salt sharpens a dish. Angostura, with its warm baking-spice character, is the most common bottle behind any bar and the one to buy first."
  }
];
