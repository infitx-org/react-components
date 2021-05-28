import { Kind } from "types";
import Row from "components/Layout/Row";
import Column from "components/Layout/Column";
import Box from "docs/styling/components/Box";
import Label from "docs/styling/components/Label";
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
      <Column align="center">
        <Box
          size="small"
          className={`color-scheme color-scheme--regular-${kind}`}
        />
        <Label size="small">{kind}</Label>
      </Column>
    ))}
  </Row>
);

export const Colors = () => (
  <Row align="space-between">
    {colors.map((color) => (
      <Column align="center">
        <Box
          size="small"
          className={`color-scheme color-scheme-${color}--regular`}
        />
        <Label size="small">{color}</Label>
      </Column>
    ))}
  </Row>
);

export const ThemeColors = kinds.reduce((prev, kind) => {
  return {
    ...prev,
    [kind]: () => (
      <Row align="space-between" key={kind}>
        {["active", "regular", "darken", "shadows"].map((type) => (
          <Column align="center">
            <Box
              size="medium"
              className={`color-scheme color-scheme--${type}-${kind}`}
            />
            <Label size="small">
              {kind} / {type}
            </Label>
            <Label size="small" variable>
              theme-colors--{type}.{kind}
            </Label>
          </Column>
        ))}
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
            <Column align="center">
              <Box
                size="medium"
                key={`${color} / ${type}`}
                className={`color-scheme color-scheme-${color}--${type}`}
              />
              <Label size="small">
                {color} / {type}
              </Label>
              <Label size="small" variable>
                theme-color--{color}.{type}
              </Label>
            </Column>
          );
        })}
      </Row>
    ),
  };
}, {});
