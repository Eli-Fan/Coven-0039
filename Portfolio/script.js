function idsFromDataset(stepEl) {
  const raw = stepEl.dataset.fade || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

function fadeOutByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("fade-out");
  });
}

function fadeInByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("fade-out");
  });
}

function idsFromShowDataset(stepEl) {
  const raw = stepEl.dataset.show || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

function showByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("is-hidden");
  });
}

function hideByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("is-hidden");
  });
}

function idsFromAttr(stepEl, attrName) {
  const raw = stepEl.dataset[attrName] || "";
  return raw.split(",").map(s => s.trim()).filter(Boolean);
}

function showByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove("is-hidden");
  });
}

function hideByIds(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("is-hidden");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof scrollama !== "function") {
    console.warn("Scrollama not loaded. Covers will not auto-fade.");
    return;
  }

  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
      offset: 0.55,
      debug: false,
    })
    .onStepEnter((response) => {
  // START steps (your original): fade covers out + show content
  fadeOutByIds(idsFromAttr(response.element, "fade"));
  showByIds(idsFromAttr(response.element, "show"));

  // END steps (new): hide content + fade next cover in
  hideByIds(idsFromAttr(response.element, "hide"));
  fadeInByIds(idsFromAttr(response.element, "fadein"));
})
.onStepExit((response) => {
  if (response.direction === "up") {
    // Reverse what happened on enter
    fadeInByIds(idsFromAttr(response.element, "fade"));
    hideByIds(idsFromAttr(response.element, "show"));

    fadeOutByIds(idsFromAttr(response.element, "fadein"));
    showByIds(idsFromAttr(response.element, "hide"));
  }
});

  window.addEventListener("resize", scroller.resize);
});
