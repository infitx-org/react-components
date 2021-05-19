import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { InputSize } from "types";
import Select from "./Select";

const options = new Array(5).fill(0).map((_, index) => ({
  label: (index + 1).toString(),
  value: (index + 1).toString(),
}));

const commonProps = {
  options,
  onChange: jest.fn(),
};

function getOptions(container: HTMLElement): NodeListOf<HTMLDivElement> {
  return container.querySelectorAll(
    ".rc-select__option"
  ) as NodeListOf<HTMLDivElement>;
}
function getInput(container: HTMLElement): HTMLInputElement {
  return container.querySelector("input[type='text']") as HTMLInputElement;
}

describe("tests the select props", () => {
  it("renders the select", () => {
    const { container } = render(<Select {...commonProps} />);
    expect(container.querySelector(".rc-select")).toBeTruthy();
    expect(container.querySelectorAll('input[type="text"]')).toHaveLength(1);
  });

  it("does not renders options are closed", () => {
    const { container } = render(<Select {...commonProps} />);
    expect(container.querySelector(".rc-select__options")).toBeFalsy();
  });

  it("renders the label for the option value", () => {
    const [{ label, value }] = options;
    const { container } = render(<Select {...commonProps} value={value} />);
    const input = getInput(container);
    expect(input.value).toBe(label);
  });

  it("renders no label when option value does not exist", () => {
    const { container } = render(<Select {...commonProps} value="null" />);
    const input = getInput(container);
    expect(input.value).toBe("");
  });

  it("renders the placeholder", () => {
    const { container } = render(
      <Select {...commonProps} placeholder="test" />
    );
    expect(container.querySelector(".placeholder")).toBeTruthy();
  });

  it("renders the classname", () => {
    const { container } = render(<Select {...commonProps} className="test" />);
    expect(container.querySelector(".test")).toBeTruthy();
  });

  it("renders as disabled", () => {
    const { container } = render(<Select {...commonProps} disabled />);
    const input = getInput(container);
    expect(input.disabled).toBeTruthy();
  });

  it("renders as pending", () => {
    const { container } = render(<Select {...commonProps} pending />);
    expect(container.querySelector(".rc-spinner")).toBeTruthy();
  });

  it("renders as required", () => {
    const { container } = render(<Select {...commonProps} required />);
    expect(container.querySelector(".rc-field--required")).toBeTruthy();
  });

  it("renders as invalid", () => {
    const { container } = render(<Select {...commonProps} invalid />);
    expect(container.querySelector(".rc-field--invalid")).toBeTruthy();
    expect(container.querySelector(".rc-invalid-icon")).toBeTruthy();
  });

  it("renders the small, medium, large sizes", () => {
    Object.values(InputSize).forEach((size) => {
      const { container } = render(<Select {...commonProps} size={size} />);
      expect(container.querySelector(`.rc-field--${size}`)).toBeTruthy();
    });
  });

  it("renders the options when clicked", () => {
    const { container } = render(<Select {...commonProps} />);
    userEvent.click(getInput(container));
    expect(container.querySelector(".rc-select__options")).toBeInTheDocument();
  });

  it("renders the options when focused", () => {
    const { container } = render(<Select {...commonProps} />);
    fireEvent.focus(getInput(container));
    expect(container.querySelector(".rc-select__options")).toBeInTheDocument();
  });

  it("renders the clear option", () => {
    const { container } = render(
      <Select {...commonProps} onClear={jest.fn()} value={1} />
    );
    fireEvent.focus(getInput(container));
    expect(
      container.querySelector(".rc-select__option--clear")
    ).toBeInTheDocument();
  });

  it("selects a value when clicking the option", () => {
    const { container } = render(<Select {...commonProps} />);
    userEvent.click(getInput(container));
    const [option] = getOptions(container);
    userEvent.click(option);
    expect(getInput(container).value).toBe(options[0].label);
  });

  it("clear the value when clicking the clear option", () => {
    const { container } = render(
      <Select {...commonProps} onClear={jest.fn()} value={1} />
    );
    userEvent.click(getInput(container));
    userEvent.click(
      container.querySelector(".rc-select__option--clear") as Element
    );
    expect(getInput(container).value).toBe("");
  });

  it("triggers onClear when clicking the clear option", () => {
    const mockFn = jest.fn();
    const { container } = render(
      <Select {...commonProps} onClear={mockFn} value={1} />
    );
    userEvent.click(getInput(container));
    userEvent.click(
      container.querySelector(".rc-select__option--clear") as Element
    );
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when focusing", () => {
    const mockFn = jest.fn();
    const { container } = render(<Select {...commonProps} onFocus={mockFn} />);
    fireEvent.focus(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when clicking", () => {
    const mockFn = jest.fn();
    const { container } = render(<Select {...commonProps} onFocus={mockFn} />);
    userEvent.click(getInput(container));
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onFocus when tabbing", () => {
    const mockFn = jest.fn();
    render(<Select {...commonProps} onFocus={mockFn} />);
    userEvent.tab();
    expect(mockFn).toHaveBeenCalled();
  });

  it("triggers onBlur when clicking out", () => {
    const mockFn = jest.fn();
    const { container } = render(<Select {...commonProps} onBlur={mockFn} />);
    userEvent.click(getInput(container));
    userEvent.click(document.body);
    expect(mockFn).toHaveBeenCalled();
  });

  // it("triggers onBlur when tabbing away", () => {
  //   const mockFn = jest.fn();
  //   const { container } = render(<Select {...commonProps} onBlur={mockFn} />);
  //   userEvent.click(getInput(container));
  //   userEvent.tab();
  //   expect(mockFn).toHaveBeenCalled();
  // });

  it("triggers onChange when selecting a value", () => {
    const mockEvent = jest.fn();
    const { container } = render(
      <Select onChange={mockEvent} options={options} />
    );
    userEvent.click(getInput(container));
    const [option] = getOptions(container);
    userEvent.click(option);
    expect(mockEvent).toHaveBeenCalledWith("1");
  });

  // it("filter the options", () => {
  //   const [option] = options;
  //   const { container } = render(
  //     <Select options={options} value={option.value} />
  //   );
  //   userEvent.click(getInput(container));
  //   fireEvent.change(getInput(container), { target: { value: "1" } });
  //   const filteredOptions = container.querySelectorAll(".rc-select__option");
  //   expect(filteredOptions).toHaveLength(1);
  // });

  it("highlights the next option when pressing arrow down", () => {
    const [option] = options;
    const { container } = render(
      <Select options={options} value={option.value} />
    );
    userEvent.click(getInput(container));
    fireEvent.keyDown(getInput(container), { keyCode: 40 });
    const highlighted = container.querySelector(
      ".rc-select__option--highlighted"
    );
    expect(highlighted).toHaveTextContent("2");
  });

  it("highlights the next option when pressing arrow up", () => {
    const [option] = options;
    const { container } = render(
      <Select options={options} value={option.value} />
    );
    userEvent.click(getInput(container));
    fireEvent.keyDown(getInput(container), { keyCode: 38 });
    const highlighted = container.querySelector(
      ".rc-select__option--highlighted"
    );
    expect(highlighted).toHaveTextContent("5");
  });
});

// describe('Tests highlighiting with filtering', () => {
//   let wrapper;
//   const testOptions = [11, 22, 23, 24, 25].map(v => ({
//     label: v.toString(),
//     value: v,
//     disabled: v % 2 === 0,
//   }));

//   beforeEach(() => {
//     const mockEvent = jest.fn();
//     wrapper = mount(<Select onChange={mockEvent} options={testOptions} />);
//     wrapper.find('input[type="text"]').simulate('click');
//   });

//   it('highlights the correct option when pressing arrow down once', () => {
//     wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 40 });
//     expect(wrapper.state('highlightedOption')).toEqual(11);
//   });

//   it('highlights the last available option when pressing arrow up once on filtered items', () => {
//     wrapper.find('input[type="text"]').simulate('keydown', { keyCode: 38 });
//     expect(wrapper.state('highlightedOption')).toEqual(25);
//   });

//   it('highlights the next available option when pressing arrow down once on filtered items', () => {
//     wrapper
//       .find('input[type="text"]')
//       .simulate('change', { target: { value: '2' } })
//       .simulate('keydown', { keyCode: 40 });
//     expect(wrapper.state('highlightedOption')).toEqual(23);
//   });

//   it('highlights the previous available option when pressing arrow up twice on filtered items', () => {
//     wrapper
//       .find('input[type="text"]')
//       .simulate('change', { target: { value: '2' } })
//       .simulate('keydown', { keyCode: 38 })
//       .simulate('keydown', { keyCode: 38 });
//     expect(wrapper.state('highlightedOption')).toEqual(23);
//   });
// });

// it('renders the Select correctly when multiple props are set', () => {
//   const wrapper = shallow(<Select value="value-1" id="test-id" options={options} />);
//   expect(shallowToJson(wrapper)).toMatchSnapshot();
// });

// it('renders the validation wrapper', () => {
//   const wrapper = shallow(<Select placeholder="test-Select" />);
//   expect(wrapper.find(ValidationWrapper)).toHaveLength(1);
// });

// it('sorts the options by value ascending', () => {
//   const reverseOptions = [...options].reverse();
//   const wrapper = mount(<Select selected="value-1" options={reverseOptions} sortBy="value" />);
//   expect(wrapper.state().options[0]).toBe(options[0]);
// });

// it('sorts the options by value descending', () => {
//   const wrapper = mount(
//     <Select selected="value-1" options={options} sortBy="value" sortAsc={false} />,
//   );
//   const lastOption = options[options.length - 1];
//   expect(wrapper.state().options[0]).toBe(lastOption);
// });

// it('sorts the options by label', () => {
//   const unsortedOptions = toSelectOptions([1, 9, 2, 8, 5]);
//   const wrapper = mount(<Select selected="value-1" options={unsortedOptions} sortBy="label" />);
//   expect(wrapper.state().options[0].label).toBe('1');
// });

// it('sorts the options by disabled', () => {
//   const unsortedOptions = toSelectOptions([1, 9, 2, 8, 5]);
//   unsortedOptions[2].disabled = true;
//   unsortedOptions[4].disabled = true;
//   const wrapper = mount(<Select selected="value-1" options={unsortedOptions} sortBy="disabled" />);
//   expect(wrapper.state().options[0].disabled).toBe(true);
//   expect(wrapper.state().options[1].disabled).toBe(true);
// });
