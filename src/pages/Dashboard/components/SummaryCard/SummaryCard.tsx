import { Link as RouterLink } from "react-router-dom";
import { ISummaryCardProps } from "./SummaryCard.types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

export function SummaryCard({ title, value, icon, link }: ISummaryCardProps) {
  return (
    <Card sx={{ height: "100%" }} elevation={3}>
      <CardActionArea component={RouterLink} to={link} sx={{ height: "100%" }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography color="text.secondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4" component="div" fontWeight="bold">
                {value}
              </Typography>
            </Box>
            <Box
              sx={{
                height: 56,
                width: 56,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "primary.light",
                color: "primary.main",
                borderRadius: "50%",
              }}
            >
              {icon}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
