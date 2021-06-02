function getParentOverflow<T extends HTMLElement>(element: T): HTMLElement {
  const parent = <HTMLElement>element.parentNode;
  if (!parent) {
    return document.body;
  }
  const { overflowY } = window.getComputedStyle(parent);
  if (overflowY === "hidden") {
    return parent;
  }
  if (overflowY === "scroll") {
    if (element.getBoundingClientRect().height > parent.offsetHeight) {
      return parent;
    }
    return element;
  }
  if (parent === document.body) {
    return document.body;
  }
  return getParentOverflow(parent);
}

export default function getSpaceAvailability<T extends HTMLDivElement>(
  element: T | null,
  within: boolean = false
): [number, number, boolean] {
  if (!element || !element.parentNode) {
    return [0, 0, false];
  }

  const parent = <HTMLElement>element.parentNode;
  const container = getParentOverflow(parent);

  const elementRect = element.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  const spaceTop = parentRect.top - containerRect.top;
  const windowSpaceBottom =
    window.innerHeight - parentRect.top - parentRect.height;
  const containerSpaceBottom =
    containerRect.height -
    parentRect.height -
    (parentRect.top - containerRect.top);
  const spaceBottom = Math.min(containerSpaceBottom, windowSpaceBottom);

  const finalSpaceTop = within ? spaceTop + parentRect.height : spaceTop;
  const finalSpaceBottom = within
    ? spaceBottom + parentRect.height
    : spaceBottom;
  console.log(within, finalSpaceBottom, spaceBottom);

  const finalTop = within ? 0 : parentRect.height;

  if (
    elementRect.height < finalSpaceBottom ||
    finalSpaceBottom > finalSpaceTop
  ) {
    return [finalTop, finalSpaceBottom, false];
  }
  return [finalTop, finalSpaceTop, true];
}
