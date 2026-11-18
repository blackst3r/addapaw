(() => {
  // The host may subscribe after consent. The standalone proposal sends no telemetry.
  const events = new Set(["home_view", "style_selected", "photo_check_succeeded",
    "photo_check_failed", "live_studio_opened"]);
  const entries = new Set(["hero", "style-card", "example", "footer", "catalog", "craft", "studio"]);

  window.portraitEvent = function (name, properties = {}) {
    if (!events.has(name)) return;
    const detail = { name, device: matchMedia("(max-width: 640px)").matches ? "mobile" : "desktop" };
    if (typeof properties.style === "string" && /^[a-zA-Z0-9_-]{1,80}$/.test(properties.style)) {
      detail.style = properties.style;
    }
    if (entries.has(properties.entry)) detail.entry = properties.entry;
    window.dispatchEvent(new CustomEvent("addapaw:journey", { detail }));
  };

  const onHome = Boolean(document.getElementById("hero-title"));
  if (onHome) window.portraitEvent("home_view");
  document.addEventListener("click", event => {
    const anchor = event.target.closest?.("a[href]");
    if (!anchor) return;
    const url = new URL(anchor.href, location.href);
    if (url.origin === location.origin && url.pathname.endsWith("/studio.html")) {
      window.portraitEvent("style_selected", {
        style: url.searchParams.get("style"),
        entry: anchor.dataset.entry || (location.pathname.endsWith("craft.html") ? "craft" : "catalog")
      });
    }
  });
})();
