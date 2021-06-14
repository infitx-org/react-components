import { Kind } from "types";
import Row from "components/Flexbox/Row";
import Column from "components/Flexbox/Column";
import Box from "docs/components/Box";
import Label from "docs/components/Label";
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
const states = ["invalid", "required"];

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

export const States = () => (
  <Row align="space-between">
    {states.map((state) => (
      <Column align="center">
        <Box
          size="small"
          className={`color-scheme color-scheme--regular-${state}`}
        />
        <Label size="small">{state}</Label>
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

export const KindTheme = kinds.reduce((prev, kind) => {
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
              themes.$colors{type === "regular" ? "" : `--${type}`}.{kind}
            </Label>
          </Column>
        ))}
      </Row>
    ),
  };
}, {});

export const StateTheme = states.reduce((prev, state) => {
  return {
    ...prev,
    [state]: () => (
      <Row align="space-between" key={state}>
        {["active", "regular", "darken", "shadows"].map((type) => (
          <Column align="center">
            <Box
              size="medium"
              className={`color-scheme color-scheme--${type}-${state}`}
            />
            <Label size="small">
              {state} / {type}
            </Label>
            <Label size="small" variable>
              themes.$colors{type === "regular" ? "" : `--${type}`}.{state}
            </Label>
          </Column>
        ))}
      </Row>
    ),
  };
}, {});

export const ColorTheme = colors.reduce((prev, color) => {
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
                themes.${color}
                {type === "regular" ? "" : `--${type}`}.{type}
              </Label>
            </Column>
          );
        })}
      </Row>
    ),
  };
}, {});
