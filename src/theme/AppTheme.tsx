import * as React from "react";
import {
  ThemeProvider,
  createTheme,
  ThemeProviderProps,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { inputsCustomizations } from "./customizations/inputs";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";
import { feedbackCustomizations } from "./customizations/feedback";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { getDesignTokens } from "./themePrimitives";

import { AppThemeProps } from "./AppTheme.types";

export default function AppTheme({
  mode = "light",
  children,
  themeComponents,
  ...restProps
}: AppThemeProps & Omit<ThemeProviderProps, "theme">) {
  const theme = React.useMemo(() => {
    return createTheme({
      ...getDesignTokens(mode),
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...feedbackCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [themeComponents, mode]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange {...restProps}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
