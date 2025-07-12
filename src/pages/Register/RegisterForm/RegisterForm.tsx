import React, { useState } from "react";
import { AxiosError } from "axios";
import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { TPostRegisterRequestBody } from "cakes-lib-types-js";
import { useFetchPostRegister } from "src/mutations";
import { useValidationFormRegister } from "./hook";
import { useRegisterFormStore } from "./store";

export function RegisterForm(): React.JSX.Element {
  const { name, email, password, setName, setEmail, setPassword, reset } =
    useRegisterFormStore();
  const { errors, validate } = useValidationFormRegister();
  const { mutate, isLoading } = useFetchPostRegister();

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const body: TPostRegisterRequestBody = {
      name,
      email,
      password,
    };

    if (validate(body)) {
      mutate(body, {
        onSuccess: () => handleSuccess(),
        onError: (error: AxiosError) => handleError(error),
      });
    }
  };

  const handleSuccess = () => {
    reset();
    setNotification({
      open: true,
      message: "Usuário cadastrado com sucesso!",
      severity: "success",
    });
  };

  const handleError = (error: AxiosError) => {
    const errorMessage =
      error.response?.status === 409
        ? "E-mail já está cadastrado"
        : "Houve uma falha momentânea, tente novamente mais tarde.";
    setNotification({
      open: true,
      message: errorMessage,
      severity: "error",
    });
  };
  4;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 2,
      }}
    >
      <FormControl>
        <FormLabel htmlFor="name">Nome</FormLabel>
        <TextField
          id="name"
          name="name"
          placeholder="Digite seu nome"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
          fullWidth
          required
          variant="outlined"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="email">E-mail</FormLabel>
        <TextField
          id="email"
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(errors.email)}
          helperText={errors.email}
          fullWidth
          required
          variant="outlined"
        />
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="password">Senha</FormLabel>
        <TextField
          id="password"
          name="password"
          type="password"
          placeholder="Digite sua senha"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={Boolean(errors.password)}
          helperText={errors.password}
          fullWidth
          required
          variant="outlined"
        />
      </FormControl>

      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        loading={isLoading}
      >
        Cadastrar
      </LoadingButton>

      <Box
        sx={{
          mt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignSelf: "center",
        }}
      >
        <Link href="/login" variant="body1">
          voltar para o login
        </Link>
      </Box>
      <Typography
        variant="caption"
        sx={{
          textAlign: "center",
          color: "text.secondary",
          mt: 4,
          fontSize: 12,
        }}
      >
        © {new Date().getFullYear()} Sistema de Pedidos. Todos os direitos
        reservados.
      </Typography>
      <Snackbar
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{
            width: "100%",
            minWidth: 360,
            backgroundColor:
              notification.severity === "error" ? "#E02041" : "#f25822",
            color: "#fff",
            fontWeight: 500,
            borderRadius: 2,
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
