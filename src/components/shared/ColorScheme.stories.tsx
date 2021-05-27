import React from "react";
import { Kind } from "types";
import Row from "components/Layout/Row";
import "./ColorScheme.scss";

export default {
  title: "Color Schemes",
};

function ThemeBlock({ kind = "", modifier = "", variable = "" }) {
  const className = `color-scheme color-scheme${
    modifier ? `--${modifier}` : ""
  }-${kind}`;

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
            modifier="regular"
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
    {[
      "blue",
      "dark-blue",
      "green",
      "red",
      "orange",
      "gray",
      "dark-gray",
      "alpha",
    ].map((color) => (
      <Row align="space-between">
        {["lighter", "lighter", "regular", "dark", "darker"].map((n) => {
          return (
            <ThemeBlock
              modifier={n}
              kind={color}
              variable={`map-get($theme-color-${color}, "${n}");`}
            />
          );
        })}
      </Row>
    ))}
  </>
);
