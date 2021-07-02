import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Layout from "./Layout";

describe("tests the Layout as a whole", () => {
  it("renders the layout components", () => {
    const { container } = render(
      <Layout>
        <Layout.Navbar title="Layout" username="user" />
        <Layout.Content>
          <Layout.SideMenu>Menu</Layout.SideMenu>
          <Layout.Page>Page</Layout.Page>
        </Layout.Content>
      </Layout>
    );
    expect(container.querySelector(".rc-layout")).toBeTruthy();
    expect(container.querySelector(".rc-layout__navbar")).toBeTruthy();
    expect(container.querySelector(".rc-layout__content")).toBeTruthy();
    expect(container.querySelector(".rc-layout__side-menu")).toBeTruthy();
    expect(container.querySelector(".rc-layout__page")).toBeTruthy();
  });
});

describe("tests the Layout component", () => {
  it("renders the layout", () => {
    const { container } = render(<Layout>layout</Layout>);
    expect(container.querySelector(".rc-layout")).toBeTruthy();
    expect(container.querySelector(".rc-layout")?.textContent).toBe("layout");
  });

  it("renders the prop classname on the layout", () => {
    const { container } = render(<Layout className="test">content</Layout>);
    expect(container.querySelector(".rc-layout.test")).toBeTruthy();
  });
});

describe("tests the Layout.Content component", () => {
  it("renders the content", () => {
    const { container } = render(<Layout.Content>content</Layout.Content>);
    expect(container.querySelector(".rc-layout__content")).toBeTruthy();
    expect(container.querySelector(".rc-layout__content")?.textContent).toBe(
      "content"
    );
  });

  it("renders the prop classname on the content", () => {
    const { container } = render(
      <Layout.Content className="test">content</Layout.Content>
    );
    expect(container.querySelector(".rc-layout__content.test")).toBeTruthy();
  });
});

describe("tests the Layout.SideMenu component", () => {
  it("renders the sidemenu", () => {
    const { container } = render(<Layout.SideMenu>side menu</Layout.SideMenu>);
    expect(container.querySelector(".rc-layout__side-menu")).toBeTruthy();
    expect(container.querySelector(".rc-layout__side-menu")?.textContent).toBe(
      "side menu"
    );
  });

  it("renders the prop classname on the sidemenu", () => {
    const { container } = render(
      <Layout.SideMenu className="test">content</Layout.SideMenu>
    );
    expect(container.querySelector(".rc-layout__side-menu.test")).toBeTruthy();
  });
});

describe("tests the Layout.Page component", () => {
  it("renders the page", () => {
    const { container } = render(<Layout.Page>page</Layout.Page>);
    expect(container.querySelector(".rc-layout__page")).toBeTruthy();
    expect(container.querySelector(".rc-layout__page")?.textContent).toBe(
      "page"
    );
  });

  it("renders the prop classname on the page", () => {
    const { container } = render(
      <Layout.Page className="test">content</Layout.Page>
    );
    expect(container.querySelector(".rc-layout__page.test")).toBeTruthy();
  });
});

describe("tests the Layout.Navbar component", () => {
  it("renders the navbar", () => {
    const { container } = render(
      <Layout.Navbar title="Navbar" username="user" />
    );
    expect(container.querySelector(".rc-layout__navbar")).toBeTruthy();
  });

  it("renders the title on the navbar", () => {
    const { container } = render(
      <Layout.Navbar title="Navbar" username="user" />
    );
    expect(
      container.querySelector(".rc-layout__navbar__link")?.textContent
    ).toBe("Navbar");
  });

  it("renders the username on the navbar", () => {
    const { container } = render(
      <Layout.Navbar title="Navbar" username="User" />
    );
    expect(
      container.querySelector(".rc-layout__navbar__block")?.textContent
    ).toBe("User");
  });

  it("renders the prop classname on the navbar", () => {
    const { container } = render(
      <Layout.Navbar title="Layout" username="user" className="test" />
    );
    expect(container.querySelector(".rc-layout__navbar.test")).toBeTruthy();
  });
});

it("renders the layout correctly when multiple props are set", () => {
  const { container } = render(
    <Layout>
      <Layout.Navbar title="Layout" username="user" />
      <Layout.Content>
        <Layout.SideMenu>Menu</Layout.SideMenu>
        <Layout.Page>Page</Layout.Page>
      </Layout.Content>
    </Layout>
  );
  expect(container).toMatchSnapshot();
});
