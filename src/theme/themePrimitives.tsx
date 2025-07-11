import { createTheme, alpha, PaletteMode, Shadows } from "@mui/material/styles";

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    highlighted: true;
  }
}
declare module "@mui/material/styles" {
  interface ColorRange {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  }

  interface PaletteColor extends ColorRange {}

  interface Palette {
    baseShadow: string;
  }
}

const defaultTheme = createTheme();

const customShadows: Shadows = [...defaultTheme.shadows];

export const brand = {
  50: "#e9f4fb",
  100: "#d3e9f7",
  200: "#aad3ef",
  300: "#70b8e4",
  400: "#339ad9",
  500: "#2b86bf",
  600: "#246fa0",
  700: "#1d5980",
  800: "#153f59",
  900: "#0d2a3b",
};

export const gray = {
  50: "#f8f9fa",
  100: "#f1f3f5",
  200: "#e9ecef",
  300: "#dee2e6",
  400: "#ced4da",
  500: "#adb5bd",
  600: "#868e96",
  700: "#495057",
  800: "#343a40",
  900: "#212529",
};

export const green = {
  50: "#effaf3",
  100: "#d7f4e3",
  200: "#a9e8c5",
  300: "#74db9d",
  400: "#3bce75",
  500: "#27b96a",
  600: "#209a58",
  700: "#197c47",
  800: "#115e35",
  900: "#0b4024",
};

export const orange = {
  50: "#fff3ee",
  100: "#ffe0d6",
  200: "#ffc2ad",
  300: "#ffa07f",
  400: "#f97d50",
  500: "#f25822",
  600: "#df4f1f",
  700: "#bf431a",
  800: "#993616",
  900: "#702911",
};

export const red = {
  50: "#fff0f2",
  100: "#ffd6db",
  200: "#ffadb7",
  300: "#ff7d8f",
  400: "#f85768",
  500: "#e02041",
  600: "#c41c39",
  700: "#a01831",
  800: "#7d1328",
  900: "#5a0e1f",
};

export const getDesignTokens = (mode: PaletteMode) => {
  customShadows[1] =
    mode === "dark"
      ? "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px"
      : "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px";

  return createTheme({
    palette: {
      mode,
      primary: {
        ...orange,
        light: orange[300],
        main: orange[500],
        dark: orange[700],
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#0E1418",
        contrastText: "#ffffff",
        light: gray[700],
        dark: "#000000",
      },
      info: {
        ...brand,
        light: brand[100],
        main: brand[400],
        dark: brand[700],
        contrastText: gray[50],
      },
      warning: {
        ...orange,
        light: orange[300],
        main: orange[400],
        dark: orange[700],
      },
      error: {
        ...red,
        light: red[300],
        main: red[500],
        dark: red[700],
      },
      success: {
        ...green,
        light: green[300],
        main: green[500],
        dark: green[700],
      },
      grey: { ...gray },
      divider: mode === "dark" ? alpha(gray[700], 0.6) : alpha(gray[300], 0.4),
      background: {
        default: mode === "dark" ? gray[900] : "#fefefe",
        paper: mode === "dark" ? "#0c0f11" : gray[50],
      },
      text: {
        primary: mode === "dark" ? "#FDF5F2" : "#0E1418",
        secondary: mode === "dark" ? "#DDDDDE" : "#666666",
      },
      action: {
        hover: alpha(gray[200], 0.2),
        selected: alpha(gray[200], 0.3),
        ...(mode === "dark" && {
          hover: alpha(gray[600], 0.2),
          selected: alpha(gray[600], 0.3),
        }),
      },
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: -0.5,
      },
      h2: { fontSize: "2.25rem", fontWeight: 600, lineHeight: 1.2 },
      h3: { fontSize: "1.875rem", lineHeight: 1.2 },
      h4: { fontSize: "1.5rem", fontWeight: 600, lineHeight: 1.5 },
      h5: { fontSize: "1.25rem", fontWeight: 600 },
      h6: { fontSize: "1.125rem", fontWeight: 600 },
      subtitle1: { fontSize: "1.125rem" },
      subtitle2: { fontSize: "0.875rem", fontWeight: 500 },
      body1: { fontSize: "0.875rem" },
      body2: { fontSize: "0.875rem", fontWeight: 400 },
      caption: { fontSize: "0.75rem", fontWeight: 400 },
    },
    shape: {
      borderRadius: 8,
    },
    shadows: customShadows,
  });
};
