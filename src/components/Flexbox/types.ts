export enum TopBottom {
  "top" = "flex-start",
  "bottom" = "flex-end",
}
export enum LeftRight {
  "left" = "flex-start",
  "right" = "flex-end",
}

export enum Mappers {
  "top" = "flex-start",
  "bottom" = "flex-end",
  "left" = "flex-start",
  "right" = "flex-end",
}

export type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "baseline"
  | "stretch";

export type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignWithMap<T extends string> = `${AlignItems}` | `${T}`;
export type JustifyWithMap<T extends string> = `${JustifyContent}` | `${T}`;
