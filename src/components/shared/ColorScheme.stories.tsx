import React from "react";
import { Kind } from "types";
import Row from "components/Layout/Row";
import "./ColorScheme.scss";

export default {
  title: "Color Schemes",
};

function ThemeBlock({ kind = "", modifier = "regular", variable = "" }) {
  const className = `color-scheme color-scheme--${modifier}-${kind}`;

  return (
    <div className={className}>
      <div className="variable">{variable}</div>
      <div className="labels">
        {kind} - {modifier}
      </div>
    </div>
  );
}

function Tester({ kind = "" }) {
  const [state, setState] = React.useState("regular");
  const set = (modifier = "") => () => setState(modifier);

  const className = `color-scheme color-scheme--tester color-scheme--${state}-${kind}`;

  return (
    <div
      role="presentation"
      className={className}
      onMouseEnter={set("active")}
      onMouseLeave={set("regular")}
      onMouseDown={set("darken")}
      onMouseUp={set("active")}
    >
      <div className="labels">
        {kind} - {state}
      </div>
    </div>
  );
}

export const ThemeColors = () => (
  <>
    {Object.values(Kind).map((kind) => {
      return (
        <Row align="space-between">
          <ThemeBlock
            kind={kind}
            modifier="active"
            variable={`map-get($theme-colors--light, "${kind}");`}
          />
          <ThemeBlock
            kind={kind}
            variable={`map-get($theme-colors, "${kind}");`}
          />
          <ThemeBlock
            kind={kind}
            modifier="darken"
            variable={`map-get($theme-colors--dark, "${kind}");`}
          />
          <ThemeBlock
            kind={kind}
            modifier="shadows"
            variable={`map-get($theme-shadows, "${kind}");`}
          />
          <Tester kind={kind} />
        </Row>
      );
    })}
  </>
);

export const ThemeColorSchemes = () => (
  <>
    {["blue", "dark-blue", "green", "gray", "dark-gray", "alpha"].map(
      (color) => {
        return (
          <Row align="space-between">
            <ThemeBlock
              kind={`${color}-1`}
              variable={`map-get($theme-color-scheme-1, "${color}");`}
            />
            <ThemeBlock
              kind={`${color}-2`}
              variable={`map-get($theme-color-scheme-2, "${color}");`}
            />
            <ThemeBlock
              kind={`${color}-3`}
              variable={`map-get($theme-color-scheme-3, "${color}");`}
            />
            <ThemeBlock
              kind={`${color}-4`}
              variable={`map-get($theme-color-scheme-4, "${color}");`}
            />
            <ThemeBlock
              kind={`${color}-5`}
              variable={`map-get($theme-color-scheme-5, "${color}");`}
            />
          </Row>
        );
      }
    )}
  </>
);
