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

const userIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <g>
      <circle cx="20" cy="20" r="20" fill="#fff" />
    </g>
  </svg>
);

const Template = (args) => <Layout {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: (
    <>
      <Layout.Navbar
        title="Layout"
        username="test"
        onUsernameClick={console.log}
        userIcon={userIcon}
      />
      <Layout.Content>
        <Layout.SideMenu>Menu</Layout.SideMenu>
        <Layout.Page>Page</Layout.Page>
      </Layout.Content>
    </>
  ),
};

export const ComposingNavbar = () => (
  <Layout.Navbar title="Composing Navbar">
    <Layout.Navbar.User username="User clickable name">
      <Layout.Navbar.User.Item onClick={console.log}>
        Logout
      </Layout.Navbar.User.Item>
      <Layout.Navbar.User.Item onClick={console.log}>
        Profile
      </Layout.Navbar.User.Item>
    </Layout.Navbar.User>
  </Layout.Navbar>
);
