import React from "react";
import { ITagProps, TagColor } from "./Tag.types";
import Box from "@mui/material/Box";
import { useTheme, Theme } from "@mui/material/styles";

const getColorStyles = (
  theme: Theme
): Record<TagColor, React.CSSProperties> => ({
  yellow: {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.dark,
  },
  blue: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.info.dark,
  },
  green: {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.dark,
  },
  gray: {
    backgroundColor: theme.palette.grey[200],
    color: theme.palette.grey[800],
  },
  red: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.dark,
  },
});

export function Tag({ text, color }: ITagProps) {
  const theme = useTheme();
  const colorStyles = getColorStyles(theme)[color];

  return (
    <Box
      component="span"
      sx={{
        display: "inline-block",
        px: 1.5,
        py: 0.5,
        fontSize: "0.75rem",
        fontWeight: 500,
        borderRadius: "999px",

        ...colorStyles,
      }}
    >
      {text}
    </Box>
  );
}
