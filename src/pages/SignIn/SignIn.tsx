import * as React from "react";
import { Box } from "@mui/material";
import { Container, Card } from "src/components";
import { SignInForm } from "./SignInForm";
export function SignIn(): React.JSX.Element {
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
        description="Acesse o painel para gerenciar seus pedidos com rapidez e praticidade."
      >
        <SignInForm />
      </Card>
    </Container>
  );
}
