import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  minHeight: "560px",
  padding: theme.spacing(4, 2),
  gap: theme.spacing(1),
  border: "1px solid #fff",
  backgroundColor: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.08)",
  backdropFilter: "blur(5px)",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
}));
