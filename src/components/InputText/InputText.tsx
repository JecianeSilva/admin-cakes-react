import React from "react";
import { Box, FormLabel, TextField } from "@mui/material";
import { IInputTextProps } from "./InputText.types";

export const InputText: React.FC<IInputTextProps> = ({
  id,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  autoFocus = false,
  disabled = false,
  error = false,
  helperText = "",
  multiline = false,
  rows = 1,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <TextField
        id={id}
        fullWidth
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        helperText={helperText}
        multiline={multiline}
        rows={rows}
      />
    </Box>
  );
};
