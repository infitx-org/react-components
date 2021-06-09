export type BaseInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
>;

export type BaseSelect = Omit<
  React.SelectHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
>;

export type BaseButton = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
>;
