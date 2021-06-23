import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

interface ModalPortalProps {
  root?: Element;
  children: React.ReactNode;
}

class ModalPortal extends PureComponent<ModalPortalProps> {
  private mountPoint: HTMLDivElement;

  private modalIndex: number;

  constructor(props: ModalPortalProps) {
    super(props);
    this.mountPoint = document.createElement("div");
    this.mountPoint.className = "rc-modal__portal";
    this.modalIndex = document.querySelectorAll(".rc-modal__portal").length;
  }

  componentDidMount() {
    const parent = this.props.root || document.body;
    parent.appendChild(this.mountPoint);
    if (!this.mountPoint.contains(document.activeElement)) {
      // @ts-ignore
      document.activeElement?.blur();
    }
  }

  componentWillUnmount() {
    const parent = this.props.root || document.body;
    parent.removeChild(this.mountPoint);
  }

  render() {
    // @ts-ignore
    const childrenWithIndex = React.cloneElement(this.props.children, {
      modalIndex: this.modalIndex,
    });

    return ReactDOM.createPortal(childrenWithIndex, this.mountPoint);
  }
}

export default ModalPortal;
