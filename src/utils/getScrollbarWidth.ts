export default function getScrollbarWidth(): number {
  let scrollbarWidth = 0;
  if (typeof document !== "undefined") {
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.position = "absolute";
    div.style.top = "-9999";
    div.style.overflow = "scroll";
    document.body.appendChild(div);
    scrollbarWidth = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }
  return scrollbarWidth;
}
