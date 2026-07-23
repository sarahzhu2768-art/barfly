/* =========================================================================
   MAIN.JS
   -------------------------------------------------------------------------
   Runs on every page. Right now it does one small job: it looks at the
   current page's filename and adds an "active" class to the matching nav
   link, so you can see which section of the site you're on.

   This is a good first script to read because it's short and shows a
   common pattern: grab some elements, loop over them, check a condition,
   change something about the ones that match.
   ========================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // window.location.pathname gives us something like "/cocktails.html"
  // We split on "/" and take the last piece to get just the filename.
  const path = window.location.pathname.split("/").pop() || "index.html";

  // Grab every link inside the site navigation.
  const navLinks = document.querySelectorAll(".site-nav a");

  navLinks.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === path) {
      link.classList.add("active");
    }
  });
});
