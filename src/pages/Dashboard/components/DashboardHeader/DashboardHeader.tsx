import { Box, Button } from "@mui/material";
import { IDashboardHeaderProps } from "./DashboardHeader.types";
import { Add } from "@mui/icons-material";

export function DashboardHeader({ onNewOrderClick }: IDashboardHeaderProps) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { md: "center" },
        justifyContent: "space-between",
        gap: 2,
        mb: 4,
      }}
    >
      <Button
        variant="contained"
        size="large"
        startIcon={<Add />}
        onClick={onNewOrderClick}
        sx={{ fontWeight: "bold" }}
      >
        Novo Pedido
      </Button>
    </Box>
  );
}
