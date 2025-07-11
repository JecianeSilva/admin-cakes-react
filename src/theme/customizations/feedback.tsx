import { Theme, alpha, Components } from "@mui/material/styles";

/* eslint-disable import/prefer-default-export */
export const feedbackCustomizations: Components<Theme> = {
  MuiAlert: {
    styleOverrides: {
      root: ({ theme, ownerState }) => {
        const isError = ownerState.severity === "error";
        const isWarning = ownerState.severity === "warning";
        const isSuccess = ownerState.severity === "success";
        const isInfo = ownerState.severity === "info";

        return {
          borderRadius: 10,
          backgroundColor: isError
            ? theme.palette.error.main
            : isWarning
            ? theme.palette.warning.main
            : isSuccess
            ? theme.palette.success.main
            : theme.palette.primary.main,
          color: "#fff",
          border: "none",
          "& .MuiAlert-icon": {
            color: "#fff",
          },
          "& .MuiAlert-action button": {
            color: "#fff",
            background: "transparent",
            border: "none",
            padding: 0,
            minWidth: 0,
            "&:hover": {
              background: "transparent",
            },
          },
          ...theme.applyStyles("dark", {
            backgroundColor: isError
              ? theme.palette.error.dark
              : theme.palette.background.paper,
          }),
        };
      },
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
