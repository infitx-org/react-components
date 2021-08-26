import classnames from "classnames";
import React, { PureComponent, KeyboardEvent, FocusEvent } from "react";
import "./Tabs.scss";

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

type CustomSelectEvent = React.MouseEvent<HTMLDivElement, MouseEvent> & {
  target: HTMLDivElement;
};

export interface TabProps {
  children: React.ReactNode;
  selected?: boolean;
  focused?: boolean;
  disabled?: boolean;
  flex?: boolean;
  style?: React.CSSProperties;
  className?: string;
  onSelect?: (e: CustomSelectEvent) => void;
}

type TabWithRefProps = TabProps & {
  ref: React.Ref<HTMLDivElement>;
};

function Tab(
  {
    selected,
    focused,
    children,
    disabled,
    flex,
    style,
    className,
    onSelect,
  }: TabProps,
  ref: React.Ref<HTMLDivElement>
) {
  const tabClassName = classnames([
    "rc-tabs__tab",
    focused && "rc-tabs__tab--focused",
    selected && "rc-tabs__tab--selected",
    disabled && "rc-tabs__tab--disabled",
    flex && "rc-tabs__tab--flexible",
    className,
  ]);

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={tabClassName}
      style={style}
      role="presentation"
    >
      {children}
    </div>
  );
}

const TabWithRef = React.forwardRef<HTMLDivElement, TabProps>(Tab);

export interface TabPanelProps {
  style?: React.CSSProperties;
  className?: string;
  flex?: boolean;
  children: React.ReactNode;
}

function TabPanel({ children, flex, style, className }: TabPanelProps) {
  const classNames = classnames([
    "rc-tabs__tab-panel",
    flex && "rc-tabs__tab-panel--flexible",
    className,
  ]);
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
}

type TabElement = React.ReactElement<TabWithRefProps>;
type TabPanelElement = React.ReactElement<TabPanelProps>;

export interface TabsProps {
  style?: React.CSSProperties;
  id?: string;
  className?: string;
  selected?: number;
  disabled?: boolean;
  flex?: boolean;
  children: TabElement[] | TabPanelElement[];
  onSelect?: (evt: CustomSelectEvent, index: number) => void;
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
    return (child as React.ReactElement).type === TabWithRef;
  }

  private tabRefs = React.createRef<HTMLDivElement[]>();

  constructor(props: TabsProps) {
    super(props);

    this.state = {
      selected: this.getSelectableIndex(this.props.selected),
      hasFocus: false,
    };

    this.getComponents = this.getComponents.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.selectTab = this.selectTab.bind(this);
    this.setRef = this.setRef.bind(this);

    this.onSelect = this.onSelect.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  handleKeyDown(e: KeyboardEvent): void {
    const { keyCode } = e.nativeEvent;
    if (keyCode === 37) {
      this.selectTab(this.state.selected - 1, false);
      return;
    }
    if (keyCode === 39) {
      this.selectTab(this.state.selected + 1, true);
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

  onSelect(evt: CustomSelectEvent, index: number): void {
    this.setState({ selected: index, hasFocus: true }, () => {
      this.props.onSelect?.(evt, index);
    });
  }

  getComponents(): [TabElement[], TabPanelElement[]] {
    const components = React.Children.toArray(this.props.children);
    const tabs = components.filter(Tabs.isTab) as TabElement[];
    const tabPanels = components.filter(Tabs.isTabPanel) as TabPanelElement[];
    return [tabs, tabPanels];
  }

  getSelectableIndex(index: number = 0, goNext: boolean = true): number {
    function arrayRotate<T>(src: T[], count: number, reverse: boolean): T[] {
      const arr = [...src];
      if (reverse) {
        arr.reverse();
      }
      for (let i = 0; i < (reverse ? arr.length - count - 1 : count); i += 1) {
        arr.push(arr.shift() as T);
      }
      return arr;
    }
    const [tabs] = this.getComponents();
    const r = arrayRotate(tabs, index, !goNext);
    const inOrder = r.find((t) => !t.props.disabled);
    return inOrder ? tabs.indexOf(inOrder) : -1;
  }

  setRef(node: HTMLDivElement) {
    (this.tabRefs as React.MutableRefObject<HTMLDivElement[]>).current = [
      ...(this.tabRefs.current || []),
      node,
    ];
  }

  selectTab(index: number, goNext: boolean): void {
    const toClick = this.getSelectableIndex(index, goNext);
    this.tabRefs.current?.[toClick].click();
  }

  render() {
    const { selected, hasFocus } = this.state;
    const { id, style, className, disabled } = this.props;
    const [rawTabs, rowPanels] = this.getComponents();
    const realSelected =
      this.props.selected !== undefined ? this.props.selected : selected;

    const tabs = rawTabs.map((tab, index) => {
      const isDisabled = tab.props.disabled || disabled;
      const isSelected = realSelected === index;
      const isFocused = isSelected && hasFocus;
      const onSelect =
        isDisabled || isSelected
          ? undefined
          : (evt: CustomSelectEvent) => this.onSelect(evt, index);
      return React.cloneElement(tab, {
        ...tab.props,
        key: index.toString(),
        disabled: isDisabled,
        selected: isSelected,
        focused: isFocused,
        onSelect,
        ref: this.setRef,
      });
    });

    const panel = rowPanels[selected] || null;
    const tabsClassNames = classnames(["rc-tabs", className]);

    return (
      <div
        id={id}
        style={style}
        className={tabsClassNames}
        tabIndex={0}
        role="presentation"
        onKeyDown={this.handleKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <div className="rc-tabs__tabs">{tabs}</div>
        {panel}
      </div>
    );
  }
}

export { TabWithRef as Tab, Tabs, TabPanel };
