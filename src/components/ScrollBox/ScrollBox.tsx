import classnames from "classnames";
import React, { PureComponent } from "react";
import getScrollbarWidth from "utils/getScrollbarWidth";
import ScrollBar from "./ScrollBar";
import "./ScrollBox.scss";

export interface ScrollBoxProps {
  className?: string;
  style?: React.CSSProperties;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  showTrack?: boolean;
  children: React.ReactNode;
}

class ScrollBox extends PureComponent<ScrollBoxProps> {
  private wrapperRef = React.createRef<HTMLDivElement>();

  private scrollbarRef: React.RefObject<ScrollBar> = React.createRef();

  private scrollbarWidth = getScrollbarWidth();

  constructor(props: ScrollBoxProps) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.updateScrollbar = this.updateScrollbar.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  componentDidMount() {
    this.getContentBox()?.addEventListener("scroll", this.updateScrollbar);
    setTimeout(() => this.updateScrollbar(), 0);
  }

  componentDidUpdate() {
    this.updateScrollbar();
  }

  componentWillUnmount() {
    this.getContentBox()?.removeEventListener("scroll", this.updateScrollbar);
  }

  handleResize() {
    this.updateScrollbar();
  }

  onDrag(ratio: number) {
    const content = this.getContent();
    const contentBox = this.getContentBox();

    if (content && contentBox) {
      const contentRect = content.getBoundingClientRect();
      const contentBoxRect = contentBox.getBoundingClientRect();
      const scrollTop = ratio * (contentRect.height - contentBoxRect.height);
      contentBox.scrollTop = scrollTop;
    }
  }

  getWrapper() {
    return this.wrapperRef.current;
  }

  getContentBox() {
    return this.getWrapper()?.firstElementChild;
  }

  getContent() {
    return this.getContentBox()?.firstElementChild;
  }

  updateScrollbar() {
    const contentBox = this.getContentBox();
    const content = this.getContent();
    if (!content || !contentBox) {
      return;
    }

    const position = {
      scrollTop: contentBox.scrollTop,
      offset: 0,
      contentHeight: parseFloat(getComputedStyle(content).height),
      height: contentBox.getBoundingClientRect().height,
    };
    if (this.scrollbarRef.current) {
      this.scrollbarRef.current.setPosition(position);
    }
  }

  render() {
    const {
      showTrack,
      handleStyle,
      trackStyle,
      style,
      children,
      className,
    } = this.props;
    const wrapperClassName = classnames(["rc-scrollbox__wrapper", className]);

    return (
      <div ref={this.wrapperRef} className={wrapperClassName} style={style}>
        <div
          className="rc-scrollbox__content-box"
          style={{
            width: `calc(100% + ${this.scrollbarWidth}px)`,
            marginRight: `${-this.scrollbarWidth}px`,
          }}
        >
          <div className="rc-scrollbox__content">{children}</div>
        </div>
        <ScrollBar
          ref={this.scrollbarRef}
          trackStyle={trackStyle}
          handleStyle={handleStyle}
          showTrack={showTrack}
          onDrag={this.onDrag}
        />
      </div>
    );
  }
}
export default ScrollBox;
