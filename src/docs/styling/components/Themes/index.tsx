import { Kind } from "types";
import Row from "components/Layout/Row";
import Box from "docs/styling/components/Box";
import "./Themes.scss";

const colors = [
  "blue",
  "dark-blue",
  "green",
  "red",
  "orange",
  "gray",
  "dark-gray",
  "alpha",
];

const kinds = Object.values(Kind);

export const Kinds = () => (
  <Row align="space-between">
    {kinds.map((kind) => (
      <Box
        size="small"
        label={kind}
        className={`color-scheme color-scheme--regular-${kind}`}
      />
    ))}
  </Row>
);

export const Colors = () => (
  <Row align="space-between">
    {colors.map((color) => (
      <Box
        size="small"
        label={color}
        className={`color-scheme color-scheme-${color}--regular`}
      />
    ))}
  </Row>
);

export const ThemeColors = kinds.reduce((prev, kind) => {
  return {
    ...prev,
    [kind]: () => (
      <Row align="space-between" key={kind}>
        <Box
          size="medium"
          label={`${kind} / active`}
          className={`color-scheme color-scheme--active-${kind}`}
          variable={`theme-colors--light / ${kind}`}
        />
        <Box
          size="medium"
          label={`${kind} / regular`}
          className={`color-scheme color-scheme--regular-${kind}`}
          variable={`theme-colors / ${kind}`}
        />
        <Box
          size="medium"
          label={`${kind} / darken`}
          className={`color-scheme color-scheme--darken-${kind}`}
          variable={`theme-colors--dark / ${kind}`}
        />
        <Box
          size="medium"
          label={`${kind} / shadows`}
          className={`color-scheme color-scheme--shadows-${kind}`}
          variable={`theme-shadows / ${kind}`}
        />
      </Row>
    ),
  };
}, {});

export const ThemeColorSchemes = colors.reduce((prev, color) => {
  return {
    ...prev,
    [color.replace("-", "")]: () => (
      <Row align="space-between">
        {["lighter", "light", "regular", "dark", "darker"].map((type) => {
          return (
            <Box
              size="medium"
              key={`${color} / ${type}`}
              label={`${color} / ${type}`}
              className={`color-scheme color-scheme-${color}--${type}`}
              variable={`theme-color-${color} / ${type}`}
            />
          );
        })}
      </Row>
    ),
  };
}, {});
