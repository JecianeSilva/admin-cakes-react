import * as React from "react";
import { Box } from "@mui/material";
import { Container, Card } from "src/components";
import { RegisterForm } from "./RegisterForm";
export function Register(): React.JSX.Element {
  return (
    <Container direction="row" sx={{ height: "100%" }}>
      <Box
        component="img"
        src="src/assets/logo.png"
        alt="Logo"
        sx={{
          height: 90,
          width: "max-content",
        }}
      />
      <Card
        variant="outlined"
        title="Área do gestor"
        description="Cadastre-se para gerenciar seus pedidos com rapidez e praticidade."
      >
        <RegisterForm />
      </Card>
    </Container>
  );
}
