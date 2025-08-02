import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Grid,
  Typography,
  Snackbar,
  Alert,
  Container,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputText } from "../../../components";
import { LoadingButton } from "@mui/lab";
import { useValidationCategoryForm } from "./hook";
import { useCategoryFormStore } from "../../../store";
import { useNavigate } from "react-router-dom";
import { useFetchPostCategory } from "../../../mutations";
import { TPostSaveCategoryRequestBody } from "cakes-lib-types-js";

const ItemGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export function CreateCategoryForm() {
  const navigate = useNavigate();
  const { name, description, image, status, setField, reset } =
    useCategoryFormStore();
  const { validate, errors } = useValidationCategoryForm();
  const { mutate, isLoading } = useFetchPostCategory();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    image || null
  );
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate({ name })) {
      setNotification({
        open: true,
        message: "Por favor, corrija os erros do formulário.",
        severity: "error",
      });
      return;
    }

    const categoryData: TPostSaveCategoryRequestBody = {
      name,
      description: description || undefined,
    };

    mutate(
      { data: categoryData, image: imageFile },
      {
        onSuccess: () => {
          reset();
          setImageFile(null);
          setImagePreview(null);
          setNotification({
            open: true,
            message: "Categoria cadastrada com sucesso!",
            severity: "success",
          });
          navigate("/categorias");
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Erro ao cadastrar categoria";
          setNotification({
            open: true,
            message: errorMessage,
            severity: "error",
          });
        },
      }
    );
  };

  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Cadastro de categoria
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        mt={2}
        sx={{ marginLeft: "unset" }}
      >
        <Card sx={{ backgroundColor: "white" }}>
          <Grid container spacing={3} alignItems="flex-start">
            <ItemGrid size={{ xs: 12, md: 6, lg: 8 }}>
              <InputText
                id="name"
                label="Nome da categoria"
                value={name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Digite o nome"
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12 }}>
              <InputText
                id="description"
                label="Descrição"
                value={description || ""}
                onChange={(e) => setField("description", e.target.value)}
                multiline
                rows={3}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6 }}>
              <FormLabel htmlFor="image">Imagem</FormLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
              />
              {imagePreview && (
                <Box
                  mt={1}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "4px",
                    border: "2px solid #ccc",
                  }}
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              )}
            </ItemGrid>

            <Grid size={{ xs: 12 }} display="flex" alignItems="flex-end">
              <LoadingButton
                type="submit"
                variant="contained"
                color="primary"
                loading={isLoading}
              >
                Cadastrar categoria
              </LoadingButton>
            </Grid>
          </Grid>
        </Card>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
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
    </Container>
  );
}
