import classnames from "classnames";
import React, { PureComponent } from "react";
import ReactResizeDetector from "react-resize-detector";
import ScrollBar from "./ScrollBar";
import "./ScrollBox.scss";

export interface ScrollBoxProps {
  className?: string;
  flex?: boolean;
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
    this.updateContentSize();
    this.updateScrollbar();
    this.contentBoxRef.current?.addEventListener(
      "scroll",
      this.updateScrollbar
    );
  }

  componentDidUpdate() {
    this.updateContentSize();
    this.updateScrollbar();
  }

  componentWillUnmount() {
    this.contentBoxRef.current?.removeEventListener(
      "scroll",
      this.updateScrollbar
    );
  }

  handleResize() {
    this.updateContentSize();
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
    if (!this.wrapperRef.current) {
      return;
    }
    const { width } = this.wrapperRef.current.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(
      this.wrapperRef.current,
      null
    );
    const paddingLeft = parseFloat(
      computedStyle.getPropertyValue("padding-left")
    );
    const paddingRight = parseFloat(
      computedStyle.getPropertyValue("padding-right")
    );
    const exactWidth = `${width - paddingLeft + paddingRight}px`;

    this.contentRef.current!.style.minWidth = exactWidth;
    this.contentRef.current!.style.maxWidth = exactWidth;
    this.contentRef.current!.style.width = exactWidth;
  }

  render() {
    const {
      showTrack,
      handleStyle,
      trackStyle,
      style,
      children,
      flex,
      className,
    } = this.props;
    const wrapperClassName = classnames(["rc-scrollbox__wrapper", className]);
    const contentBoxClassName = classnames([
      "rc-scrollbox__content-box",
      flex && "rc-scrollbox__content-box--flexible",
    ]);
    const contentClassName = classnames([
      "rc-scrollbox__content",
      flex && "rc-scrollbox__content--flexible",
    ]);

    return (
      <ReactResizeDetector
        handleWidth
        handleHeight
        onResize={this.handleResize}
        targetRef={this.wrapperRef}
      >
        <div ref={this.wrapperRef} className={wrapperClassName} style={style}>
          <div ref={this.contentBoxRef} className={contentBoxClassName}>
            <ReactResizeDetector
              handleHeight
              onResize={this.handleResize}
              targetRef={this.contentRef}
            >
              <div ref={this.contentRef} className={contentClassName}>
                {children}
              </div>
            </ReactResizeDetector>
          </div>

          <ScrollBar
            ref={this.scrollbarRef}
            trackStyle={trackStyle}
            handleStyle={handleStyle}
            showTrack={showTrack}
            onDrag={this.onDrag}
          />
        </div>
      </ReactResizeDetector>
    );
  }
}
export default ScrollBox;
