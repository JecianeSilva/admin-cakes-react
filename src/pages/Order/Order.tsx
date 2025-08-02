import { Typography, Container } from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function Order() {
  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Pedidos
      </Typography>
      <EmptyState
        icon={<WarningAmber sx={{ fontSize: 48 }} color={"primary"} />}
        title={"Nenhum pedido encontrado"}
        description={""}
      />
    </Container>
  );
}
