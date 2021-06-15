export type BaseInput = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "onChange"
>;

export type BaseSelect = Omit<
  React.SelectHTMLAttributes<HTMLInputElement>,
  "size" | "value" | "onChange"
>;

export type BaseButtonAttributes = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size"
>;
