import classnames from "classnames";
import React, { PureComponent } from "react";
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

  private contentBoxRef = React.createRef<HTMLDivElement>();

  private contentRef = React.createRef<HTMLDivElement>();

  private scrollbarRef: React.RefObject<ScrollBar> = React.createRef();

  constructor(props: ScrollBoxProps) {
    super(props);
    this.handleResize = this.handleResize.bind(this);
    this.updateScrollbar = this.updateScrollbar.bind(this);
    this.updateContentSize = this.updateContentSize.bind(this);
    this.onDrag = this.onDrag.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.updateContentSize(), 0);
    this.updateScrollbar();
    this.contentBoxRef.current?.addEventListener(
      "scroll",
      this.updateScrollbar
    );
  }

  componentDidUpdate() {
    this.updateScrollbar();
  }

  componentWillUnmount() {
    this.contentBoxRef.current?.removeEventListener(
      "scroll",
      this.updateScrollbar
    );
  }

  handleResize() {
    this.updateScrollbar();
  }

  onDrag(ratio: number) {
    const contentEl = this.contentRef.current;
    const contentBoxEl = this.contentBoxRef.current;

    if (contentEl && contentBoxEl) {
      const contentElRect = contentEl.getBoundingClientRect();
      const contentBoxElRect = contentBoxEl.getBoundingClientRect();
      const scrollTop =
        ratio * (contentElRect.height - contentBoxElRect.height);
      contentBoxEl.scrollTop = scrollTop;
    }
  }

  updateScrollbar() {
    if (!this.contentBoxRef.current || !this.contentRef.current) {
      return;
    }
    const contentEl = this.contentRef.current as Element;
    const position = {
      scrollTop: this.contentBoxRef.current.scrollTop,
      offset: 0,
      contentHeight: contentEl.getBoundingClientRect().height,
      height: this.contentBoxRef.current.getBoundingClientRect().height,
    };
    if (this.scrollbarRef.current) {
      this.scrollbarRef.current.setPosition(position);
    }
  }

  updateContentSize() {
    if (
      !this.wrapperRef.current ||
      !this.contentBoxRef.current ||
      !this.contentRef.current
    ) {
      return;
    }

    const contentBoxWidth = this.contentBoxRef.current.getBoundingClientRect()
      .width;
    const contentWidth = this.contentRef.current.getBoundingClientRect().width;
    const wrapperWidth = this.wrapperRef.current.getBoundingClientRect().width;
    const scrollbarWidth = contentBoxWidth - contentWidth;

    console.log(wrapperWidth, contentBoxWidth, contentWidth, scrollbarWidth);

    // this.contentRef.current.style.width = `${wrapperWidth}px`;
    // this.contentBoxRef.current.style.paddingRight = `${scrollbarWidth}px`;
    // this.wrapperRef.current.style.width = `${wrapperWidth}px`;
    // this.contentBoxRef.current.style.width = `${contentBoxWidth + scrollbarWidth}px`;
    // this.contentBoxRef.current.style.overflowY = 'scroll';

    // this.wrapperRef.current.style.paddingRight = `${scrollbarWidth}px`;
    // this.contentRef.current.style.width = `${contentBoxWidth}px`;
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
        <div ref={this.contentBoxRef} className="rc-scrollbox__content-box">
          <div ref={this.contentRef} className="rc-scrollbox__content">
            {children}
          </div>
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
