import { SelectChangeEvent } from "@mui/material/Select";

export interface IOption {
  value: string | number;
  label: string;
}

export interface IInputSelectProps {
  id: string;
  label: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: IOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  autoFocus?: boolean;
}