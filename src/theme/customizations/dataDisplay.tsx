import { Theme, alpha, Components } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { typographyClasses } from "@mui/material/Typography";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { chipClasses } from "@mui/material/Chip";
import { iconButtonClasses } from "@mui/material/IconButton";

export const dataDisplayCustomizations: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        [`& .${svgIconClasses.root}`]: {
          width: "1rem",
          height: "1rem",
          color: theme.palette.common.white,
        },
        [`& .${typographyClasses.root}`]: {
          fontWeight: 500,
        },
        [`& .${buttonBaseClasses.root}`]: {
          display: "flex",
          gap: 8,
          padding: "6px 8px",
          borderRadius: theme.shape.borderRadius,

          "&.Mui-selected": {
            opacity: 1,
            backgroundColor: theme.palette.primary.dark,
            [`& .${svgIconClasses.root}`]: {
              color: theme.palette.common.white,
            },
            "&:focus-visible": {
              backgroundColor: alpha(theme.palette.primary.main, 0.16),
            },
          },
          "&:focus-visible": {
            backgroundColor: "transparent",
          },
        },
      }),
    },
  },
  MuiListItemText: {
    styleOverrides: {
      primary: ({ theme }) => ({
        fontSize: theme.typography.body2.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.body2.lineHeight,
      }),
      secondary: ({ theme }) => ({
        fontSize: theme.typography.caption.fontSize,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListSubheader: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: "transparent",
        padding: "4px 8px",
        fontSize: theme.typography.caption.fontSize,
        fontWeight: 500,
        lineHeight: theme.typography.caption.lineHeight,
      }),
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        minWidth: 0,
      },
    },
  },
  MuiChip: {
    defaultProps: {
      size: "small",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        border: "1px solid",
        borderRadius: "999px",
        [`& .${chipClasses.label}`]: {
          fontWeight: 600,
        },
        variants: [
          {
            props: { color: "default" },
            style: {
              borderColor: theme.palette.grey[200],
              backgroundColor: theme.palette.grey[100],
              [`& .${chipClasses.label}, & .${chipClasses.icon}`]: {
                color: theme.palette.grey[500],
              },
              ...theme.applyStyles("dark", {
                borderColor: theme.palette.grey[700],
                backgroundColor: theme.palette.grey[800],
                [`& .${chipClasses.label}, & .${chipClasses.icon}`]: {
                  color: theme.palette.grey[300],
                },
              }),
            },
          },
          {
            props: { color: "success" },
            style: {
              borderColor: theme.palette.success.light,
              backgroundColor: alpha(theme.palette.success.light, 0.2),
              [`& .${chipClasses.label}, & .${chipClasses.icon}`]: {
                color: theme.palette.success.main,
              },
              ...theme.applyStyles("dark", {
                borderColor: theme.palette.success.dark,
                backgroundColor: theme.palette.success.dark,
                [`& .${chipClasses.label}, & .${chipClasses.icon}`]: {
                  color: theme.palette.success.light,
                },
              }),
            },
          },
          {
            props: { color: "error" },
            style: {
              borderColor: theme.palette.error.light,
              backgroundColor: alpha(theme.palette.error.light, 0.2),
              [`& .${chipClasses.label}, & .${chipClasses.icon}`]: {
                color: theme.palette.error.main,
              },
              ...theme.applyStyles("dark", {
                borderColor: theme.palette.error.dark,
                backgroundColor: theme.palette.error.dark,
                [`& .${chipClasses.label}`]: {
                  color: theme.palette.error.light,
                },
                [`& .${chipClasses.icon}`]: {
                  color: theme.palette.error.light,
                },
              }),
            },
          },
          {
            props: { size: "small" },
            style: {
              maxHeight: 20,
              [`& .${chipClasses.label}, & .${svgIconClasses.root}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
          {
            props: { size: "medium" },
            style: {
              [`& .${chipClasses.label}`]: {
                fontSize: theme.typography.caption.fontSize,
              },
            },
          },
        ],
      }),
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: "flex",
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
  MuiIcon: {
    defaultProps: {
      fontSize: "small",
    },
    styleOverrides: {
      root: {
        variants: [
          {
            props: { fontSize: "small" },
            style: { fontSize: "1rem" },
          },
        ],
      },
    },
  },
};
