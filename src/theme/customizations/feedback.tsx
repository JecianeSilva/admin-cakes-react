import { Theme, alpha, Components } from "@mui/material/styles";

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 10,
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        color: theme.palette.text.primary,
        border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
        "& .MuiAlert-icon": {
          color: theme.palette.primary.main,
        },
        ...theme.applyStyles("dark", {
          backgroundColor: alpha(theme.palette.primary.dark, 0.2),
          border: `1px solid ${alpha(theme.palette.primary.dark, 0.3)}`,
        }),
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiDialog-paper": {
          borderRadius: 10,
          border: "1px solid",
          borderColor: theme.palette.divider,
        },
      }),
    },
  },
  MuiLinearProgress: {
    styleOverrides: {
      root: ({ theme }) => ({
        height: 8,
        borderRadius: 8,
        backgroundColor: theme.palette.grey[200],
        ...theme.applyStyles("dark", {
          backgroundColor: theme.palette.grey[800],
        }),
      }),
    },
  },
};
