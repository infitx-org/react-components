/* eslint no-console: "off" */
import Layout from "./Layout";

export default {
  title: "Components/Layout",
  component: Layout,
  subcomponents: {
    "Layout.Navbar": Layout.Navbar,
    "Layout.Page": Layout.Page,
    "Layout.SideMenu": Layout.SideMenu,
    "Layout.Content": Layout.Content,
  },
};

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Layout.Navbar
        title="Layout"
        username="test"
        onLogoutClick={console.log}
      />
      <Layout.Content>
        <Layout.SideMenu>Menu</Layout.SideMenu>
        <Layout.Page>Page</Layout.Page>
      </Layout.Content>
    </>
  ),
};
