import { TextFieldProps } from "@mui/material";

export interface IInputPriceProps
  extends Omit<
    TextFieldProps,
    "onChange" | "value" | "select" | "multiline" | "type" | "rows"
  > {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currencySymbol?: string;
  decimalPlaces?: number;
}