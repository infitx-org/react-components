export enum AlignMap {
  "top" = "flex-start",
  "bottom" = "flex-end",
}

export enum JustifyMap {
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

export type AlignWithMap = `${AlignItems | keyof typeof AlignMap}`;
export type JustifyWithMap = `${JustifyContent | keyof typeof JustifyMap}`;
