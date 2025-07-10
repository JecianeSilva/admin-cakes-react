import type { ThemeOptions } from "@mui/material/styles";

export interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions["components"];
  mode?: "light" | "dark";
}
