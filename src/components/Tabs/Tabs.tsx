import "./Tabs.scss";

import classnames from "classnames";
// import * as utils from 'common/generic';
// import keyCodes from 'common/keyCodes';
import React, {
  PureComponent,
  KeyboardEvent,
  MouseEvent,
  FocusEvent,
} from "react";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

interface TabProps {
  children: React.ReactNode;
  selected: boolean;
  focused: boolean;
  onSelect: (e: MouseEvent<HTMLDivElement>) => void;
  disabled: boolean;
  hidden: boolean;
  flex: boolean;
  style: React.CSSProperties;
}

function Tab({
  selected,
  focused,
  children,
  disabled,
  hidden,
  flex,
  style,
  onSelect,
}: TabProps) {
  if (hidden) {
    return null;
  }
  const className = classnames([
    "el",
    "el-tabs__tab-item",
    focused && "el-tabs__tab-item--focused",
    selected && "el-tabs__tab-item--selected",
    disabled && "el-tabs__tab-item--disabled",
    flex && "fill-width",
  ]);

  return (
    <div
      onClick={onSelect}
      className={className}
      style={style}
      role="presentation"
    >
      {children}
    </div>
  );
}

interface TabPanelProps {
  style: React.CSSProperties;
  className: string;
  children: React.ReactNode;
  flex: boolean;
}

function TabPanel({ children, flex, style, className }: TabPanelProps) {
  const classNames = classnames([
    "el-tabs__tab__content",
    flex && "el-tabs__tab__content--flexible",
    className,
  ]);
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}

type TabElement = React.ReactElement<TabProps>;
type TabPanelElement = React.ReactElement<TabPanelProps>;

interface TabsProps {
  id: string;
  selected?: number;
  children: TabElement[] | TabPanelElement[];
  disabled: boolean;
  flex: boolean;
  onSelect: (evt: MouseEvent, index: number) => void;
  onFocus?: (evt: FocusEvent) => void;
  onBlur?: (evt: FocusEvent) => void;
}

interface TabsState {
  selected: number;
  hasFocus?: boolean;
}

class Tabs extends PureComponent<TabsProps, TabsState> {
  static isTabPanel(child: React.ReactNode): boolean {
    return (child as React.ReactElement).type === TabPanel;
  }

  static isTab(child: React.ReactNode): boolean {
    return (child as React.ReactElement).type === Tab;
  }

  private wrapper = React.createRef<HTMLDivElement>();

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      selected: this.getSelectableIndex(this.props.selected),
      hasFocus: false,
    };

    this.onSelect = this.onSelect.bind(this);
    this.getComponents = this.getComponents.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectTab = this.selectTab.bind(this);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleKeyDown(e: KeyboardEvent): void {
    const { keyCode } = e.nativeEvent;
    if (keyCode === 37) {
      this.selectTab(this.state.selected - 1);
      return;
    }
    if (keyCode === 39) {
      this.selectTab(this.state.selected + 1);
    }
  }

  onFocus(e: FocusEvent) {
    this.setState(
      {
        hasFocus: true,
      },
      () => this.props.onFocus?.(e)
    );
  }

  onBlur(e: FocusEvent) {
    this.setState(
      {
        hasFocus: false,
      },
      () => this.props.onBlur?.(e)
    );
  }

  onSelect(evt: MouseEvent, index: number): void {
    this.setState({ selected: index, hasFocus: true }, () => {
      this.props.onSelect?.(evt, index);
    });
  }

  getComponents(): [TabElement[], TabPanelElement[]] {
    const children = React.Children.toArray(this.props.children);
    const tabs = children.filter(Tabs.isTab) as TabElement[];
    const tabPanels = children.filter(Tabs.isTabPanel) as TabPanelElement[];
    return [tabs, tabPanels];
  }

  getSelectableIndex(index: number = 0): number {
    const [tabs] = this.getComponents();
    return Math.max(0, Math.min(tabs.length - 1, index));
  }

  selectTab(index: number): void {
    this.setState({
      selected: this.getSelectableIndex(index),
    });
  }

  render() {
    const [rawTabs, rowPanels] = this.getComponents();
    const { selected } = this.state;

    const tabs = rawTabs.map((tab, index) => {
      return React.cloneElement(tab, {
        ...tab.props,
        key: index.toString(),
        selected: selected === index && !tab.props.disabled,
        focused: selected === index && this.state.hasFocus,
        onSelect: (evt: MouseEvent) => this.onSelect(evt, index),
      });
    });

    const panel = rowPanels[selected] || null;

    const tabsClassNames = classnames(["element", "el-tabs"]);

    return (
      <div
        className={tabsClassNames}
        tabIndex={0}
        role="presentation"
        ref={this.wrapper}
        onKeyDown={this.handleKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div className="el-tabs__tab-items">{tabs}</div>
        {panel}
      </div>
    );
  }
}

export { Tab, Tabs, TabPanel };
