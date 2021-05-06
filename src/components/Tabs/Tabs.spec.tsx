import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { Tab, TabPanel, Tabs } from "./Tabs";

const testTabs = (
  <Tabs id="test-tabs" flex>
    <Tab>Tab1</Tab>
    <Tab>Tab2</Tab>
    <Tab disabled>Tab3</Tab>
    <TabPanel>TabPanel1</TabPanel>
    <TabPanel>TabPanel2</TabPanel>
    <TabPanel>TabPanel3</TabPanel>
  </Tabs>
);

describe("tests the tabs", () => {
  it("renders the tabs", () => {
    const { container } = render(testTabs);
    expect(container.querySelector(".el-tabs")).toBeTruthy();
  });

  it("renderd the prop id", () => {
    const { container } = render(testTabs);
    expect(container.querySelector("#test-tabs")).toBeTruthy();
  });

  it("renders all the tab items", () => {
    const { container } = render(testTabs);
    expect(container.querySelectorAll(".el-tabs__tab")).toHaveLength(3);
  });

  it("renders only one tab panel", () => {
    const { container } = render(testTabs);
    expect(container.querySelectorAll(".el-tabs__tab-panel")).toHaveLength(1);
  });

  it("renders the first tabpanel content", () => {
    const { container } = render(testTabs);
    expect(screen.getByText("TabPanel1")).toBeInTheDocument();
  });

  it("renders the second tabpanel content when second tab is clicked", () => {
    const { container } = render(testTabs);
    const [, secondTab] = container.querySelectorAll(".el-tabs__tab");
    userEvent.click(secondTab);
    expect(screen.getByText("TabPanel2")).toBeInTheDocument();
  });

  it("does not renders the tabpanel of a disabled tab when clicked", () => {
    const { container } = render(testTabs);
    const [, , thirdTab] = container.querySelectorAll(".el-tabs__tab");
    userEvent.click(thirdTab);
    expect(screen.queryByText("TabPanel3")).not.toBeInTheDocument();
  });

  it("triggers onSelect when clicking an unselected tab", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <Tabs onSelect={mockEvent}>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </Tabs>
    );

    const [, secondTab] = container.querySelectorAll(".el-tabs__tab");
    userEvent.click(secondTab);
    expect(mockEvent).toHaveBeenCalled();
    // extract the tab this way
    const [clickEvent] = mockEvent.mock.calls[0];
    expect(clickEvent.type).toEqual("click");
    expect(clickEvent.target).toEqual(secondTab);
  });

  it("does not triggers onSelect when clicking an disabled tab", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <Tabs onSelect={mockEvent}>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
      </Tabs>
    );

    const [, secondTab] = container.querySelectorAll(".el-tabs__tab");
    userEvent.click(secondTab);
    expect(mockEvent).not.toHaveBeenCalled();
  });

  it("does not triggers onSelect when clicking the selected tab", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <Tabs onSelect={mockEvent}>
        <Tab>Tab1</Tab>
        <Tab>Tab2</Tab>
      </Tabs>
    );

    const [firstTab] = container.querySelectorAll(".el-tabs__tab");
    userEvent.click(firstTab);
    expect(mockEvent).not.toHaveBeenCalled();
  });
});

// Snapshot

it("renders the tabs correctly when multiple props are set", () => {
  const { container } = render(testTabs);
  expect(container).toMatchSnapshot();
});
