import * as React from "react";
import { Theme, alpha, Components } from "@mui/material/styles";
import { SvgIconProps } from "@mui/material/SvgIcon";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { dividerClasses } from "@mui/material/Divider";
import { menuItemClasses } from "@mui/material/MenuItem";
import { selectClasses } from "@mui/material/Select";
import { tabClasses } from "@mui/material/Tab";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

export const navigationCustomizations: Components<Theme> = {
  MuiMenuItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        padding: "6px 8px",
        [`&.${menuItemClasses.focusVisible}`]: {
          backgroundColor: "transparent",
        },
        [`&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}`]: {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: "0px",
        [`&.${dividerClasses.root}`]: {
          margin: "0 -8px",
        },
      },
      paper: ({ theme }) => ({
        marginTop: "4px",
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: "none",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        [`& .${buttonBaseClasses.root}.Mui-selected`]: {
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
        },
      }),
    },
  },
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>(
        (props, ref) => (
          <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
        )
      ),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          borderColor: theme.palette.primary.dark,
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: theme.palette.primary.main,
        },
        "&:before, &:after": {
          display: "none",
        },
      }),
      select: {
        display: "flex",
        alignItems: "center",
      },
    },
  },
  MuiLink: {
    defaultProps: {
      underline: "none",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        display: "inline-flex",
        alignItems: "center",
        color: theme.palette.text.primary,
        fontWeight: 500,
        fontSize: theme.typography.body2.fontSize,
        textDecoration: "none",
        position: "relative",
        width: "fit-content",
        transition: "color 0.2s ease",

        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "1px",
          width: "100%",
          backgroundColor: theme.palette.text.secondary,
          opacity: 0.3,
          transition: "opacity 0.3s ease, background-color 0.3s ease",
        },

        "&:hover": {
          color: theme.palette.primary.main,
          "&::before": {
            backgroundColor: theme.palette.primary.main,
            opacity: 1,
          },
        },

        "&:focus-visible": {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: "4px",
          borderRadius: "2px",
        },
      }),
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        "& .MuiListItemIcon-root": {
          color: theme.palette.primary.contrastText,
        },
        "& .MuiTypography-root": {
          color: theme.palette.primary.contrastText,
        },
        "& .MuiSvgIcon-root": {
          color: theme.palette.primary.contrastText,
        },
      }),
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.Mui-selected": {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.primary.dark,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: { minHeight: "fit-content" },
      indicator: ({ theme }) => ({
        backgroundColor: theme.palette.primary.main,
      }),
    },
  },
  MuiTab: {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: "6px 8px",
        marginBottom: "8px",
        textTransform: "none",
        minWidth: "fit-content",
        minHeight: "fit-content",
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
        border: "1px solid transparent",
        ":hover": {
          color: theme.palette.primary.main,
          backgroundColor: alpha(theme.palette.primary.main, 0.05),
          borderColor: theme.palette.primary.main,
        },
        [`&.${tabClasses.selected}`]: {
          color: theme.palette.primary.dark,
        },
      }),
    },
  },
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
        flex: 1,
        borderRadius: "99px",
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: "transparent",
        border: `1px solid ${theme.palette.divider}`,
        width: 12,
        height: 12,
        borderRadius: "50%",
        "& text": {
          display: "none",
        },
        "&.Mui-active": {
          border: "none",
          color: theme.palette.primary.main,
        },
        "&.Mui-completed": {
          border: "none",
          color: theme.palette.success.main,
        },
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        "&.Mui-completed": {
          opacity: 0.6,
        },
      }),
    },
  },
};
