import {
  AlignMap,
  JustifyMap,
  AlignWithMap,
  JustifyWithMap,
  AlignItems,
  JustifyContent,
} from "./types";

export const mapAlignToProperty = (property: AlignWithMap): AlignItems => {
  console.log(property, AlignMap, property in AlignMap);
  if (property in AlignMap) {
    return AlignMap[property as keyof typeof AlignMap];
  }
  return property as AlignItems;
};

export const mapJustifyToProperty = (
  property: JustifyWithMap
): JustifyContent => {
  if (property in JustifyMap) {
    return JustifyMap[property as keyof typeof JustifyMap];
  }
  return property as JustifyContent;
};
