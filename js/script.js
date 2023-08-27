"use strict";

const house = document.getElementById("house");
let tooltipElem;

house.addEventListener("mouseover", function (event) {
  let target = event.target.closest("[data-tooltip]");
  let tooltipText = target.dataset.tooltip;
  if (!tooltipText) return;
  // let targetChildren = target.children;
  // for (let targetChild of targetChildren) {
  //   if (event.relatedTarget == targetChild) return;
  // }
  // window-relative coordinates of the target element
  let targetCoords = target.getBoundingClientRect();
  // get the document-relative coordinates of the target
  targetCoords = {
    ...targetCoords,
    top: targetCoords.top + window.scrollY,
    bottom: targetCoords.bottom + window.scrollY,
    left: targetCoords.left + window.scrollX,
    right: targetCoords.right + window.scrollX,
  };
  tooltipElem = document.createElement("p");
  tooltipElem.append(tooltipText);
  tooltipElem.classList.add("tooltip");
  document.body.append(tooltipElem);
  if (targetCoords.top - window.scrollY > tooltipElem.offsetHeight + 10) {
    tooltipElem.style.top =
      targetCoords.top - tooltipElem.offsetHeight - 7 + "px";
  } else {
    tooltipElem.style.top = targetCoords.bottom + "px";
  }

  tooltipElem.style.left =
    targetCoords.left +
    target.offsetWidth / 2 -
    tooltipElem.offsetWidth / 2 +
    "px";
});

house.addEventListener("mouseout", function (event) {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = false;
  }
});
