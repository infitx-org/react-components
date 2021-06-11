import React, { PureComponent } from "react";
import Row from "components/Layout/Row";
import TextField from "components/TextField";
import Checkbox from "components/Checkbox";
import Button from "components/Button";
import Menu from "./Menu";

export default {
  title: "Components/Menu",
  component: Menu,
  subcomponents: {
    "Menu.Item": Menu.Item,
    "Menu.Section": Menu.Section,
  }, // 👈 Adds the ListItem component as a subcomponent
};

const icon = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" />
  </svg>
);

export const Default = () => {
  const [pathname, setPathname] = React.useState("/");
  return (
    <Menu path="/" pathname={pathname} onChange={setPathname}>
      <Menu.Section label="Items">
        <Menu.Item label="One" path="/one" />
        <Menu.Item label="Two" path="/two" />
      </Menu.Section>
      <Menu.Section label="Settings">
        <Menu.Item label="Preferences" path="/preferences" />
        <Menu.Item label="Account" path="/account" />
      </Menu.Section>
    </Menu>
  );
};

export const MenuItemWithIcon = () => {
  return <Menu.Item label="Two" path="/two" icon={icon} />;
};

export const WithSection = () => {
  const [pathname, setPathname] = React.useState("/");
  return (
    <Menu path="/" pathname={pathname} onChange={setPathname}>
      <Menu.Section label="Items">
        <Menu.Item label="One" path="/one" />
        <Menu.Item label="Two" path="/two" />
      </Menu.Section>
    </Menu>
  );
};

export const Nested = () => {
  const [pathname, setPathname] = React.useState("/");
  return (
    <Menu path="/" pathname={pathname} onChange={setPathname}>
      <Menu.Section label="Items">
        <Menu.Item label="One" path="/one" />
        <Menu.Item label="Two" path="/two">
          <Menu.Item label="Go Back" path="/" back />
          <Menu.Item label="Nested" path="/two/test" />
        </Menu.Item>
      </Menu.Section>
    </Menu>
  );
};

export const PartialPath = () => {
  const [pathname, setPathname] = React.useState("/user/account");
  return (
    <Menu path="/" pathname={pathname} onChange={setPathname}>
      <Menu.Item label="One" path="/one" />
      <Menu.Item label="Two" path="/two" />
      <Menu.Item label="User" path="/user" partial />
    </Menu>
  );
};

export const ParametrizedPath = () => {
  const [pathname, setPathname] = React.useState("/users/1/comments");
  return (
    <Menu path="/" pathname={pathname} onChange={setPathname}>
      <Menu.Item label="One" path="/one" />
      <Menu.Item label="Two" path="/two" />
      <Menu.Item label="User Comments" path="/users/:id/comments" />
    </Menu>
  );
};
