import React, { PureComponent } from "react";
import classNames from "classnames";

interface Position {
  scrollTop: number;
  offset: number;
  contentHeight: number;
  height: number;
}

interface ScrollbarProps {
  showTrack?: boolean;
  trackStyle?: React.CSSProperties;
  handleStyle?: React.CSSProperties;
  onDrag: (x: number) => void;
}

interface ScrollbarState {
  showScrollbar: boolean;
  barHeight: number;
  translate: number;
  isMoving: boolean;
}

export default class ScrollBar extends PureComponent<
  ScrollbarProps,
  ScrollbarState
> {
  private trackerRef = React.createRef<HTMLDivElement>();

  private movingTimeout: number = 0;

  private mounted: boolean = true;

  private originMouseY: number = 0;

  private dragging: boolean = false;

  constructor(props: ScrollbarProps) {
    super(props);
    this.setPosition = this.setPosition.bind(this);
    this.fadeMovingHandle = this.fadeMovingHandle.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);

    this.state = {
      showScrollbar: false,
      barHeight: 0,
      translate: 0,
      isMoving: false,
    };
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  componentWillUnmount() {
    this.mounted = false;
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  onMouseDown(e: React.MouseEvent) {
    this.originMouseY = e.nativeEvent.offsetY;
    this.dragging = true;
  }

  onMouseMove(e: MouseEvent) {
    if (this.dragging && this.trackerRef.current) {
      const { top, height } = this.trackerRef.current.getBoundingClientRect();
      const mousePosY = e.pageY - top;
      if (this.props.onDrag) {
        const diff = mousePosY - this.originMouseY;
        const max = Math.round(height - this.state.barHeight);
        let ratio = diff / max;
        if (diff > max) {
          ratio = 1;
        }
        if (diff < 0) {
          ratio = 0;
        }
        this.props.onDrag(ratio);
      }
    }
  }

  onMouseUp() {
    this.dragging = false;
  }

  setPosition(positions: Position) {
    const tracker = this.trackerRef.current;
    const { height } = tracker ? tracker.getBoundingClientRect() : positions;
    const { contentHeight, scrollTop, offset } = positions;
    const totalContentHeight = offset + contentHeight;
    const viewToContentRatio = positions.height / totalContentHeight;
    const barHeight = Math.max(10, viewToContentRatio * height);
    const heightSquared = height ** 2;
    const realBarHeight = Math.max(10, heightSquared / totalContentHeight);
    const showScrollbar = viewToContentRatio < 1;
    const scrollBarScale =
      (height - realBarHeight) / (totalContentHeight - height);
    const scrollBarTranslate = scrollTop * scrollBarScale;
    const translate = showScrollbar ? scrollBarTranslate : 0;
    const isMoving = true;

    this.setState({
      showScrollbar,
      barHeight,
      translate,
      isMoving,
    });
    this.fadeMovingHandle();
  }

  fadeMovingHandle() {
    window.clearTimeout(this.movingTimeout);

    this.movingTimeout = window.setTimeout(() => {
      if (this.mounted) {
        this.setState({ isMoving: false });
      }
    }, 500);
  }

  render() {
    const { showTrack, trackStyle, handleStyle } = this.props;
    const { showScrollbar, barHeight, translate, isMoving } = this.state;
    if (!showScrollbar) {
      return null;
    }

    const handleStyles = {
      height: `${Math.round(barHeight)}px`,
      transform: `translate3d(0,${Math.round(translate)}px,0)`,
      ...handleStyle,
    };

    return (
      <div
        ref={this.trackerRef}
        className={classNames([
          "rc-scrollbox__scrollbar",
          showTrack && "rc-scrollbox__scrollbar--track-visible",
        ])}
        style={trackStyle}
      >
        <div
          role="presentation"
          onMouseDown={this.onMouseDown}
          className={`${isMoving ? "moving" : ""} scrollbar-handle`}
          style={handleStyles}
        />
      </div>
    );
  }
}
