import { useEffect, useState } from "react";
import log from "resources/log";
import { Tab, TabPanel, Tabs } from "./Tabs";

export default {
  title: "Components/Tabs",
  component: Tabs,
};

export const Default = () => (
  <Tabs>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3</Tab>
    <TabPanel> Tab Content 1 </TabPanel>
    <TabPanel> Tab Content 2 </TabPanel>
    <TabPanel> Tab Content 3 </TabPanel>
  </Tabs>
);

export const DisabledTab = () => (
  <Tabs selected={0} onSelect={log}>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab disabled>Tab 3</Tab>
    <Tab>Tab 4</Tab>
    <Tab>Tab 5</Tab>
    <TabPanel> Tab Content 1 </TabPanel>
    <TabPanel> Tab Content 2 </TabPanel>
    <TabPanel> Tab Content 3 </TabPanel>
    <TabPanel> Tab Content 4 </TabPanel>
    <TabPanel> Tab Content 5 </TabPanel>
  </Tabs>
);

export const StyledTab = () => (
  <Tabs>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab style={{ width: "300px", background: "#def", fontWeight: "bold" }}>
      Tab 3 (styled)
    </Tab>
    <TabPanel> Tab Content 1 </TabPanel>
    <TabPanel> Tab Content 2 </TabPanel>
    <TabPanel> Tab Content 3 </TabPanel>
  </Tabs>
);

export const FlexTab = () => (
  <Tabs>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab flex>Tab 3 (flex)</Tab>
    <TabPanel> Tab Content 1 </TabPanel>
    <TabPanel> Tab Content 2 </TabPanel>
    <TabPanel> Tab Content 3 </TabPanel>
  </Tabs>
);

export const StyledTabPanel = () => (
  <Tabs>
    <Tab>Tab 1</Tab>
    <Tab>Tab 2</Tab>
    <Tab>Tab 3 (panel styled)</Tab>
    <TabPanel
      style={{ width: "300px", background: "#def", fontWeight: "bold" }}
    >
      {" "}
      Tab Content 1{" "}
    </TabPanel>
    <TabPanel> Tab Content 2 </TabPanel>
    <TabPanel> Tab Content 3 </TabPanel>
  </Tabs>
);

export const onExternalSelectedChange = () => {
  const tabs = ["one", "two", "three"];
  const [selected, setSelected] = useState(2);
  useEffect(() => {
    setInterval(() => setSelected(1), 2000);
  }, []);

  return (
    <Tabs selected={selected} onSelect={(_, index) => setSelected(index)}>
      <Tab>{tabs[0]}</Tab>
      <Tab>{tabs[1]}</Tab>
      <Tab>{tabs[2]}</Tab>
    </Tabs>
  );
};

export const Nested = () => {
  const tabs = ["one", "two", "three"];
  const [selected, setSelected] = useState(2);
  useEffect(() => {
    setInterval(() => setSelected(1), 2000);
  }, []);

  return (
    <Tabs selected={selected} onSelect={(_, index) => setSelected(index)}>
      <Tab>{tabs[0]}</Tab>
      <Tab>{tabs[1]}</Tab>
      <Tab>{tabs[2]}</Tab>
      <TabPanel>
        <Tabs>
          <Tab>{tabs[0]}</Tab>
          <Tab>{tabs[1]}</Tab>
          <Tab>{tabs[2]}</Tab>
          <TabPanel>test</TabPanel>
        </Tabs>
      </TabPanel>
    </Tabs>
  );
};
