import {
  Mappers,
  AlignWithMap,
  JustifyWithMap,
  AlignItems,
  JustifyContent,
} from "./types";

export function mapAlignToProperty<T extends string>(
  property: AlignWithMap<T>
): AlignItems {
  if (property in Mappers) {
    return Mappers[property as keyof typeof Mappers];
  }
  return property as AlignItems;
}

export function mapJustifyToProperty<T extends string>(
  property: JustifyWithMap<T>
): JustifyContent {
  if (property in Mappers) {
    return Mappers[property as keyof typeof Mappers];
  }
  return property as JustifyContent;
}
