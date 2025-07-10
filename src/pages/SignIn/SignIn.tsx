import * as React from "react";
import { Container } from "../../components/Container/Container";
import Card from "../../components/Card/Card";
import { SignInForm } from "./SignInForm/SignInForm";
import { Box } from "@mui/material";
export function SignIn(): React.JSX.Element {
  return (
    <Container direction="row" sx={{ height: "100%" }}>
      <Box
        component="img"
        src="src/assets/logo.png"
        alt="Logo"
        sx={{
          height: 90,
        }}
      />
      <Card variant="outlined" title="Login">
        <SignInForm />
      </Card>
    </Container>
  );
}
