function showOnly(activeId) {
  const boxes = document.querySelectorAll(".image-box");

  boxes.forEach(box => {
    if (box.id === activeId) {
      box.classList.remove("is-hidden");
      box.classList.add("is-visible");
    } else {
      box.classList.remove("is-visible");
      box.classList.add("is-hidden");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const scroller = scrollama();

  scroller
    .setup({
      step: ".step",
      offset: 0.5,
      debug: false
    })
    .onStepEnter(response => {
      const targetId = response.element.dataset.target;
      showOnly(targetId);
    });

  window.addEventListener("resize", scroller.resize);
});