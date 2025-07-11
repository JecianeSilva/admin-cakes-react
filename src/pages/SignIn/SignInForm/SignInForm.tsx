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
import { IPostLoginResponse, TPostLoginRequestBody } from "cakes-lib-types-js";
import { useFetchPostLogin } from "src/mutations";
import { setLocalStorage } from "src/utils";
import { useValidationFormLogin } from "./hook";
import { useLoginFormStore } from "./store";

export function SignInForm(): React.JSX.Element {
  const { email, setEmail, password, setPassword, reset } = useLoginFormStore();
  const { errors, validate } = useValidationFormLogin();
  const { mutate, isLoading } = useFetchPostLogin();

  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({ open: false, message: "", severity: "success" });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const body: TPostLoginRequestBody = {
      email,
      password,
    };

    if (validate(body)) {
      mutate(body, {
        onSuccess: (data: IPostLoginResponse) => handleSuccess(data),
        onError: (error: AxiosError) => handleError(error),
      });
    }
  };

  const handleSuccess = (data: IPostLoginResponse) => {
    setLocalStorage("access_token", data.access_token);
    setLocalStorage("refresh_token", data.refresh_token);
    reset();
    setNotification({
      open: true,
      message: "Login realizado com sucesso!",
      severity: "success",
    });
    window.location.href = "/";
  };

  const handleError = (error: AxiosError) => {
    const errorMessage =
      error.response?.status === 401
        ? "Falha ao realizar login. Verifique suas credenciais."
        : "Falha no sistema, tente realizar o login mais tarde";

    setNotification({
      open: true,
      message: errorMessage,
      severity: "error",
    });
  };

  const handleForgotPassword = () => {
    window.location.href = "/";
  };

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
      <Link
        href="/forgot-password"
        variant="body1"
        sx={{ alignSelf: "flex-end" }}
      >
        Esqueci a senha
      </Link>
      <LoadingButton
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        loading={isLoading}
      >
        Entrar
      </LoadingButton>

      <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 2 }}>
        <Typography sx={{ textAlign: "center" }}>
          Não tem cadastro?{" "}
          <Link href="/register" variant="body1">
            Cadastre-se agora
          </Link>
        </Typography>
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
        autoHideDuration={3000}
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
