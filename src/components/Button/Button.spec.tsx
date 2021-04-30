import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Button from "./Button";

/* eslint-disable no-console */
const { log } = console;

const icon = (
  <svg width="55" height="55" viewBox="-6 -3 55 55">
    <circle cx="10" cy="10" r="20" />
  </svg>
);

describe("rtl test", () => {
  it("renders the label", () => {
    render(<Button label="Test-Button" onClick={log} />);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });

  it("renders the children", () => {
    render(<Button onClick={log}>Test-Button</Button>);
    expect(screen.getByText("Test-Button")).toBeDefined();
  });

  it("renders the disabled state", () => {
    const { container } = render(
      <Button onClick={log} disabled>
        Test-Button
      </Button>
    );
    expect(container.querySelector("button")).toBeDisabled();
  });

  it("renders the spinner", () => {
    const { container } = render(<Button onClick={log} pending />);
    expect(container.querySelector(".el-spinner")).toBeTruthy();
  });

  it("renders the spinner before the icon", () => {
    const { container } = render(<Button icon={icon} onClick={log} pending />);
    expect(container.querySelector(".el-spinner")).toBeTruthy();
  });

  it("renders the icon", () => {
    const { container } = render(<Button icon={icon} onClick={log} />);
    expect(container.querySelector("svg")).toBeTruthy();
  });

  it("renders the id", () => {
    const { container } = render(<Button id="test" onClick={log} />);
    expect(container.querySelector("button#test")).toBeTruthy();
  });

  it("renders the className", () => {
    const { container } = render(<Button className="test" onClick={log} />);
    expect(container.querySelector("button.test")).toBeTruthy();
  });

  it("renders the default kind as primary kind", () => {
    const { container } = render(<Button onClick={log} />);
    expect(
      container.querySelector("button.input-button--primary")
    ).toBeTruthy();
  });

  it("renders all the kinds", () => {
    ["primary", "secondary", "tertiary", "danger", "warning", "dark"].forEach(
      (kind) => {
        const { container } = render(<Button onClick={log} kind={kind} />);
        expect(
          container.querySelector(`button.input-button--${kind}`)
        ).toBeTruthy();
      }
    );
  });

  it('renders with the "noFill" prop', () => {
    const { container } = render(<Button onClick={log} noFill />);
    expect(container.querySelector("button.input-button--noFill")).toBeTruthy();
  });
  it("renders the large, medium, small sizes", () => {
    const sizes = {
      large: "l",
      medium: "m",
      small: "s",
      "extra-small": "xs",
    };
    Object.entries(sizes).forEach(([name, size]) => {
      const { container } = render(<Button onClick={log} size={size} />);
      expect(container.querySelector(`.input-button--${name}`)).toBeTruthy();
    });
  });
});

// it('triggers the onClick prop', () => {
//   const mockEvent = jest.fn();
//   const wrapper = mount(<Button onClick={mockEvent} />);
//   expect(mockEvent).not.toHaveBeenCalled();
//   wrapper.simulate('click');
//   expect(mockEvent).toHaveBeenCalled();
// });

// it('renders multiple props', () => {
//   const wrapper = shallow(<Button label="Test" icon="x" kind="primary" disabled pending noFill />);
//   expect(wrapper.find('span').text()).toBe('Test');
//   expect(wrapper.find('button').prop('kind')).toBe('primary');
//   expect(wrapper.find('button').prop('disabled')).toBe(true);
//   expect(wrapper.find(Spinner)).toHaveLength(1);
//   expect(wrapper.find(Icon)).toHaveLength(0);
// });

// // Mount render, include sub-components

// it('renders the inner icon component', () => {
//   const wrapper = mount(<Button icon="deploy" />);
//   expect(wrapper.find('.el-icon')).toHaveLength(1);
// });

// it('renders the inner spinner component', () => {
//   const wrapper = mount(<Button pending />);
//   expect(wrapper.find('.el-spinner')).toHaveLength(1);
// });

// it('renders the spinner component and overrides the icon prop', () => {
//   const wrapper = mount(<Button pending icon="deploy" />);
//   expect(wrapper.find('.el-icon')).toHaveLength(0);
//   expect(wrapper.find('.el-spinner')).toHaveLength(1);
// });

// // Snapshot testing

// it('renders the button correctly when multiple props are set', () => {
//   const wrapper = shallow(<Button label="Snapshot button" kind="secondary" disabled pending />);
//   expect(shallowToJson(wrapper)).toMatchSnapshot();
// });
