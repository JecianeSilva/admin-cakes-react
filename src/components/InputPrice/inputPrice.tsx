import React, { useEffect, useState } from "react";
import { Box, FormLabel, TextField, InputAdornment } from "@mui/material";
import { IInputPriceProps } from "./inputPrice.types";

export const InputPrice: React.FC<IInputPriceProps> = ({
  id,
  label,
  value,
  onChange,
  currencySymbol = "R$",
  decimalPlaces = 2,
  placeholder,
  required = false,
  autoFocus = false,
  disabled = false,
  error = false,
  helperText = "",
  ...rest
}) => {
  const [displayValue, setDisplayValue] = useState<string>("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      const parsed = parseFloat(value);
      const formatted = isNaN(parsed)
        ? "R$ 0,00"
        : new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
            minimumFractionDigits: 2,
          }).format(parsed);
      setDisplayValue(formatted.replace("R$", "").trim());
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let raw = event.target.value;

    const numericOnly = raw.replace(/[^\d]/g, "");

    const parsed = parseFloat(numericOnly) / 100;

    const safeValue = isNaN(parsed) ? 0 : parsed;

    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(safeValue);

    setDisplayValue(formatted.replace("R$", "").trim());

    onChange({
      ...event,
      target: {
        ...event.target,
        value: safeValue.toFixed(2),
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" gap={1}>
      <FormLabel htmlFor={id} required={required}>
        {label}
      </FormLabel>
      <TextField
        id={id}
        fullWidth
        type="text"
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        disabled={disabled}
        error={error}
        helperText={helperText}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">{currencySymbol}</InputAdornment>
          ),
          inputMode: "numeric",
        }}
        {...rest}
      />
    </Box>
  );
};
