import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export const StyledContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  overflow: "hidden",
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  position: "relative",
  "&::before": {
    content: '""',
    display: "flex",
    position: "absolute",
    zIndex: -2,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, #fb7342 50%, #f25822 100%)",
    backgroundRepeat: "no-repeat",
  },
}));

export const StyledContent = styled(Stack)(({ theme }) => ({
  maxWidth: "1560px",
  width: "100%",
  margin: "0px auto",
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));
