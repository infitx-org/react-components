import {
  AlignMap,
  JustifyMap,
  AlignWithMap,
  JustifyWithMap,
  AlignItems,
  JustifyContent,
} from "./types";

export function mapAlignToProperty(property: AlignWithMap): AlignItems {
  if (property in AlignMap) {
    return AlignMap[property as keyof typeof AlignMap];
  }
  return property as AlignItems;
}

export function mapJustifyToProperty(property: JustifyWithMap): JustifyContent {
  if (property in JustifyMap) {
    return JustifyMap[property as keyof typeof JustifyMap];
  }
  return property as JustifyContent;
}
