import React from "react";
import { Kind } from "types";
import Row from "components/Layout/Row";
import Box from "docs/styling/components/Box";
import "./ColorScheme.scss";

export default {
  title: "Styles/Color Schemes",
};

export const ThemeColors = () => (
  <>
    {Object.values(Kind).map((kind) => {
      return (
        <Row align="space-between" key={kind}>
          <Box
            label={`${kind} / active`}
            className={`color-scheme color-scheme--active-${kind}`}
            variable={`theme-colors--light / ${kind}`}
          />
          <Box
            label={`${kind} / regular`}
            className={`color-scheme color-scheme--regular-${kind}`}
            variable={`theme-colors / ${kind}`}
          />
          <Box
            label={`${kind} / darken`}
            className={`color-scheme color-scheme--darken-${kind}`}
            variable={`theme-colors--dark / ${kind}`}
          />
          <Box
            label={`${kind} / shadows`}
            className={`color-scheme color-scheme--shadows-${kind}`}
            variable={`theme-shadows / ${kind}`}
          />
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
        {["lighter", "light", "regular", "dark", "darker"].map((type) => {
          return (
            <Box
              key={`${color} / ${type}`}
              label={`${color} / ${type}`}
              className={`color-scheme color-scheme-${color}--${type}`}
              variable={`theme-color-${color} / ${type}`}
            />
          );
        })}
      </Row>
    ))}
  </>
);
