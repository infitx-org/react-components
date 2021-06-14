import React from "react";
import Layout from "./Layout";

export default {
  title: "Components/Layout",
};

const Template = (args) => (
  <Layout.Container>
    <Layout.Navbar title="Layout" username="test" onLogoutClick={console.log} />
    <Layout.Content>
      <Layout.SideMenu>Menu</Layout.SideMenu>
      <Layout.Page>Page</Layout.Page>
    </Layout.Content>
  </Layout.Container>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};
