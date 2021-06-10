import React, { PureComponent } from "react";
import Row from "components/Layout/Row";
import TextField from "components/TextField";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import Menu from "./Menu";

export default {
  title: "Components/Menu",
  component: Menu,
};

const Menu1 = ({ pathname, onChange, disabled, hidden }) => (
  <Menu path="/" pathname={pathname} onChange={onChange}>
    <Menu.Item path="/tracking" label="Tracking" hidden={hidden} />
    <Menu.Item path="/partners" label="Partners" disabled={disabled} asRoot>
      <Menu.Section label="User Info">
        <Menu.Item
          path="/partners/partner/contacts"
          label="Contacts"
          icon="circle"
          fill="#c33"
          size={6}
        />
        <Menu.Item
          path="/partners/partner/identifiers"
          label="Identifiers"
          disabled={disabled}
        />
      </Menu.Section>

      <Menu.Section label="Format Defaults" icon="access-manager-color">
        <Menu.Item path="/partners/partner/csv" label="CSV" />
        <Menu.Item
          path="/partners/partner/edifact"
          label="EDIFACT"
          icon="application-color"
        />
        <Menu.Item
          path="/partners/partner/x12"
          label="X12"
          icon="calendar-small"
          back
        />
        <Menu.Item
          path="/partners/partner/apps"
          label="Partners and Applications and this is a very long text"
        />
      </Menu.Section>

      <Menu.Section label="Configuration">
        <Menu.Item
          path="/partners/partner/documentDefinitions"
          label="Document Definitions"
        >
          <Menu.Item
            path="/partners/partner/documentDefinitions/documentDefinition"
            to="/partners/partner/documentDefinitions"
            label="Document Definitions"
            back
          />
        </Menu.Item>
      </Menu.Section>
    </Menu.Item>

    <Menu.Item
      path="/administration"
      label="administration"
      asRoot
      disabled={disabled}
    >
      <Menu.Item to="/" label="Administration" back />
      <Menu.Item path="/administration/errorcodes" label="Error Codes" partial>
        <Menu.Item
          path="/administration/errorcodes/errorCode"
          to="/administration/errorcodes"
          label="Error Code"
          back
        />
      </Menu.Item>
    </Menu.Item>
  </Menu>
);

const Menu2 = ({ pathname, onChange, disabled, hidden }) => (
  <Menu onChange={onChange}>
    <Menu.Item label="1" hidden={hidden} />
    <Menu.Item label="2" />
    <Menu.Item label="3" hidden={hidden} active />
    <Menu.Item label="4" />
    <Menu.Item label="5" hidden={hidden} />
  </Menu>
);

const Menu3 = ({ pathname, onChange }) => (
  <Menu path="/" pathname={pathname} onChange={onChange}>
    <Menu.Item label="/route" path="/route" />
    <Menu.Item label="/route/other" path="/route/other" />
    <Menu.Item
      label="/route/other/subroute"
      path="/route/other/subroute"
      partial
    />
    <Menu.Item
      label="/route/other/subroute/xyz/tre"
      path="/route/other/subroute/xyz/tre"
    />
  </Menu>
);

class MenuTester extends PureComponent {
  constructor() {
    super();
    this.onMenuChange = this.onMenuChange.bind(this);
    this.onChangePath = this.onChangePath.bind(this);
    this.onChangeDisabled = this.onChangeDisabled.bind(this);
    this.onChangeHidden = this.onChangeHidden.bind(this);
    this.state = {
      pathname: "/",
      disabled: false,
      hidden: false,
    };
  }
  onMenuChange(pathname) {
    if (pathname !== this.state.pathname) {
      this.setState({ pathname });
    }
  }
  onChangePath(pathname) {
    if (pathname !== this.state.pathname) {
      this.setState({ pathname });
    }
  }
  onChangeDisabled() {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  onChangeHidden() {
    this.setState({
      hidden: !this.state.hidden,
    });
  }
  render() {
    const style = { margin: "5px" };
    const componentWithProps = React.cloneElement(this.props.children, {
      ...this.props.children.props,
      pathname: this.state.pathname,
      onChange: this.onMenuChange,
      disabled: this.state.disabled,
      hidden: this.state.hidden,
    });
    return (
      <div style={{ ...style, border: "3px solid #eee" }}>
        <Row align="left">
          <TextField
            onChange={this.onChangePath}
            value={this.state.pathname}
            style={{ ...style, width: "300px" }}
          />
          <Button
            onClick={() => this.onChangePath("/partners/partner/contacts")}
            label="Go To Contacts"
            style={style}
          />
        </Row>
        <Row align="left">
          <Checkbox
            onChange={this.onChangeDisabled}
            checked={this.state.disabled}
            label="Disable"
            style={style}
          />

          <Checkbox
            onChange={this.onChangeHidden}
            checked={this.state.hidden}
            label="Hide"
            style={style}
          />
        </Row>
        <div style={{ width: "200px" }}>{componentWithProps}</div>
      </div>
    );
  }
}

export const TestMenu1 = () => (
  <MenuTester>
    <Menu1 />
  </MenuTester>
);
export const TestMenu2 = () => (
  <MenuTester>
    <Menu2 />
  </MenuTester>
);
export const TestMenu3 = () => (
  <MenuTester>
    <Menu3 />
  </MenuTester>
);
