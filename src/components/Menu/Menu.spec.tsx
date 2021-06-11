import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import Menu from "./Menu";

const icon = (
  <svg width="40" height="40" viewBox="0 0 40 40">
    <circle cx="20" cy="20" r="20" />
  </svg>
);

const onChangeMockEvent = jest.fn();

it("renders only the menu", () => {
  const { container } = render(
    <Menu path="/" pathname="/" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo" />
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu")).toHaveLength(1);
});

it("renders the menu wrapper also if pathname does not match any route", () => {
  const { container } = render(
    <Menu path="/" pathname="/test" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo" />
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu")).toHaveLength(1);
});

it("renders the menu items if parent root matches", () => {
  const { container } = render(
    <Menu path="/" pathname="/" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo" />
      <Menu.Item path="/bar" label="bar" />
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu-item")).toHaveLength(2);
});

it("renders the menu items if child route matches", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo" />
      <Menu.Item path="/bar" label="bar" />
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu-item")).toHaveLength(2);
});

it("renders the menu section with icons", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo" onChange={onChangeMockEvent}>
      <Menu.Section label="Menu Section" icon={icon}>
        <Menu.Item path="/foo" label="foo" />
        <Menu.Item path="/bar" label="bar" />
      </Menu.Section>
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu-section__icon")).toHaveLength(1);
});

it("renders the menu items with icons", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo" onChange={onChangeMockEvent}>
      <Menu.Section label="Menu Section">
        <Menu.Item path="/foo" label="foo" icon={icon} />
        <Menu.Item path="/bar" label="bar" icon={icon} />
      </Menu.Section>
    </Menu>
  );
  expect(container.querySelectorAll(".rc-menu-item__item-icon")).toHaveLength(
    2
  );
});

// it('does not render the menu items if no route matches', () => {
//   const { container } = render(
//     <Menu path="/" pathname="/non-existing" onChange={onChangeMockEvent}>
//       <Menu.Item path="/foo" label="foo" />
//       <Menu.Item path="/bar" label="bar" />
//     </Menu>,
//   );
//   expect(container.querySelectorAll('.rc-menu-item')).toHaveLength(0);
// });

it("renders the nested child when asRoot prop is set and route matches parent", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo">
        <Menu.Item path="/foo/nested" label="nested" />
      </Menu.Item>
      <Menu.Item path="/bar" label="bar" />
    </Menu>
  );
  const menuItem = container.querySelector(".rc-menu-item");
  expect(menuItem).toBeTruthy();
  expect(menuItem?.textContent).toBe("nested");
  expect(container.querySelectorAll(".rc-menu-item")).toHaveLength(1);
});

it("renders the nested child if matching if asRoot prop is not set ", () => {
  const { container } = render(
    <Menu path="/" pathname="/1st/2nd/3rd/4th" onChange={onChangeMockEvent}>
      <Menu.Item path="/1st" label="1st Level">
        <Menu.Item path="/1st/2nd" label="2st level">
          <Menu.Item path="/1st/2nd/3rd" label="3nd level">
            <Menu.Item path="/1st/2nd/3rd/4th" label="4th level" />
          </Menu.Item>
        </Menu.Item>
      </Menu.Item>
    </Menu>
  );

  const menuItem = container.querySelector(".rc-menu-item");
  expect(menuItem).toBeTruthy();
  expect(menuItem?.textContent).toBe("4th level");
});

it("renders the menu items when partial match is allowed", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo/partial/match" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo" partial />
      <Menu.Item path="/bar" label="bar" />
    </Menu>
  );
  const menuItem = container.querySelectorAll(".rc-menu-item");
  const activeMenuItem = container.querySelector(".rc-menu-item--active");
  expect(menuItem).toHaveLength(2);
  expect(activeMenuItem?.textContent).toBe("foo");
});

it("renders the menu items when router param is used", () => {
  const { container } = render(
    <Menu
      path="/"
      pathname="/users/:user-id/settings"
      onChange={onChangeMockEvent}
    >
      <Menu.Item path="/books" label="Books" />
      <Menu.Item path="/users/:user-id" label="User">
        <Menu.Item path="/users/:user-id/account" label="account" />
        <Menu.Item path="/users/:user-id/settings" label="settings" />
      </Menu.Item>
    </Menu>
  );
  const menuItem = container.querySelectorAll(".rc-menu-item");
  const activeMenuItem = container.querySelector(".rc-menu-item--active");
  expect(menuItem).toHaveLength(2);
  expect(activeMenuItem?.textContent).toBe("settings");
});

it("renders the menu section if parent root matches", () => {
  const { container } = render(
    <Menu path="/" pathname="/" onChange={onChangeMockEvent}>
      <Menu.Section label="Menu Section">
        <Menu.Item path="/foo" label="foo" />
        <Menu.Item path="/bar" label="bar" />
      </Menu.Section>
    </Menu>
  );
  const menuSection = container.querySelector(".rc-menu-section");
  expect(menuSection).toBeTruthy();
  const menuSectionLabel = menuSection?.querySelector(
    ".rc-menu-section__label"
  );
  expect(menuSectionLabel?.textContent).toBe("Menu Section");
});

it("renders the Menu when no pathname is set", () => {
  const { container } = render(
    <Menu onChange={onChangeMockEvent} path="?">
      <Menu.Item label="foo" path="/foo" />
      <Menu.Item label="bar" path="/bar" />
    </Menu>
  );
  const menuItems = container.querySelectorAll(".rc-menu-item");
  expect(menuItems).toHaveLength(2);
});

it("renders the manually set active prop", () => {
  const { container } = render(
    <Menu onChange={onChangeMockEvent} path="?">
      <Menu.Item label="foo" active path="/foo" />
      <Menu.Item label="bar" path="/bar" />
    </Menu>
  );
  const activeMenuItem = container.querySelector(".rc-menu-item--active");
  expect(activeMenuItem).toBeTruthy();
  expect(activeMenuItem?.textContent).toBe("foo");
});

it("renders the disabled prop on menu item", () => {
  const { container } = render(
    <Menu onChange={onChangeMockEvent} path="?">
      <Menu.Item label="foo" disabled path="/foo" />
      <Menu.Item label="bar" path="/bar" />
    </Menu>
  );
  const disabledMenuItem = container.querySelector(".rc-menu-item--disabled");
  expect(disabledMenuItem).toBeTruthy();
  expect(disabledMenuItem?.textContent).toBe("foo");
});

it("does not render a hidden menu item", () => {
  const { container } = render(
    <Menu onChange={onChangeMockEvent} path="?">
      <Menu.Item label="foo" hidden path="/foo" />
      <Menu.Item label="bar" path="/bar" />
    </Menu>
  );
  const menuItems = container.querySelectorAll(".rc-menu-item");
  expect(menuItems).toHaveLength(1);
});

it("does not render a hidden menu section", () => {
  const { container } = render(
    <Menu onChange={onChangeMockEvent} path="?">
      <Menu.Section hidden label="?">
        <Menu.Item label="foo" path="/foo" />
        <Menu.Item label="bar" path="/bar" />
      </Menu.Section>
    </Menu>
  );
  const menuSection = container.querySelectorAll(".rc-menu-section");
  expect(menuSection).toHaveLength(0);
});

it("trigger onChange when clicking a menu item", () => {
  const mockEvent = jest.fn();
  const { container } = render(
    <Menu path="/" pathname="/" onChange={mockEvent}>
      <Menu.Item label="foo" path="/foo" />
      <Menu.Item label="bar" path="/bar" />
    </Menu>
  );
  const menuItems = container.querySelectorAll(".rc-menu-item");
  userEvent.click(menuItems[0]);
  expect(mockEvent).toHaveBeenCalledWith("/foo");
});

// Snapshot
it("renders the menu correctly when multiple props are set", () => {
  const { container } = render(
    <Menu path="/" pathname="/foo" onChange={onChangeMockEvent}>
      <Menu.Item path="/foo" label="foo">
        <Menu.Item path="/foo/nested" label="nested" />
      </Menu.Item>
      <Menu.Item path="/bar" label="bar" />
    </Menu>
  );
  expect(container).toMatchSnapshot();
});
