function getParentOverflow<T extends HTMLElement>(element: T): HTMLElement {
  const parent = <HTMLElement>element.parentNode;
  if (!parent) {
    return document.body;
  }
  const { overflowX } = window.getComputedStyle(parent);
  if (overflowX === "hidden") {
    return parent;
  }
  if (overflowX === "scroll") {
    if (element.getBoundingClientRect().width > parent.offsetWidth) {
      return parent;
    }
    return element;
  }
  if (parent === document.body) {
    return document.body;
  }
  return getParentOverflow(parent);
}

export default function getHorizontalAvailability<T extends HTMLDivElement>(
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

  const spaceLeft = parentRect.left - containerRect.left;
  const windowSpaceRight =
    window.innerWidth - parentRect.left - parentRect.width;
  const containerSpaceRight =
    containerRect.width -
    parentRect.width -
    (parentRect.left - containerRect.left);
  const spaceRight = Math.min(containerSpaceRight, windowSpaceRight);

  const finalSpaceLeft = within ? spaceLeft + parentRect.width : spaceLeft;
  const finalSpaceRight = within ? spaceRight + parentRect.width : spaceRight;

  const finalLeft = within ? 0 : parentRect.left;

  if (elementRect.width < finalSpaceRight || finalSpaceRight > finalSpaceLeft) {
    return [finalLeft, finalSpaceRight, false];
  }
  return [finalLeft, finalSpaceLeft, true];
}
