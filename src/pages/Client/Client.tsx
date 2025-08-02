import { Typography, Container } from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { EmptyState } from "../../components/EmptyState/EmptyState";

export function Client() {
  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Clientes
      </Typography>
      <EmptyState
        icon={<WarningAmber sx={{ fontSize: 48 }} color={"primary"} />}
        title={"Nenhum cliente encontrado"}
        description={""}
      />
    </Container>
  );
}
