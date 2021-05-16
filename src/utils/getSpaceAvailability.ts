function getParentOverflow(elem) {
  if (!elem.parentNode) {
    return document.body;
  }
  const { overflowY } = window.getComputedStyle(elem.parentNode);
  if (overflowY === "hidden") {
    return elem.parentNode;
  }
  if (overflowY === "scroll") {
    if (elem.getBoundingClientRect().height > elem.parentNode.offsetHeight) {
      return elem.parentNode;
    }
    return elem;
  }
  if (elem.parentNode === document.body) {
    return document.body;
  }
  return getParentOverflow(elem.parentNode);
}

export default function getSpaceAvailability<T extends HTMLDivElement>(
  element: T | null
): [number, number, boolean] {
  if (!element || !element.parentNode) {
    return [0, 0, false];
  }

  const parent = <HTMLDivElement>element.parentNode;
  const container = getParentOverflow(parent);
  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const spaceTop = parentRect.top - containerRect.top;
  const spaceBottom = window.innerHeight - parentRect.top - parentRect.height;

  if (elementRect.height < spaceBottom) {
    return [parentRect.height, spaceBottom, false];
  }
  if (spaceBottom > spaceTop) {
    return [parentRect.height, spaceBottom, false];
  }
  return [parentRect.height, spaceTop, true];
}
