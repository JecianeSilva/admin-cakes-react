import React from "react";
import {
  Box,
  FormLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { IInputSelectProps } from "./InputSelect.type";

export const InputSelect: React.FC<IInputSelectProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  autoFocus = false,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <Select
        id={id}
        fullWidth
        value={value}
        onChange={onChange}
        displayEmpty
        disabled={disabled}
        error={error}
        autoFocus={autoFocus}
        variant="outlined"
        inputProps={{ "aria-label": label }}
      >
        <MenuItem value="">
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {error && helperText && (
        <FormHelperText error>{helperText}</FormHelperText>
      )}
    </Box>
  );
};
