import React, { useState } from "react";
import {
  Box,
  FormLabel,
  Typography,
  Snackbar,
  Alert,
  SelectChangeEvent,
  Grid,
  CircularProgress,
  Container,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useProductFormStore } from "./store";
import { useValidationProductForm } from "./hook/useValidationProductForm";
import { LoadingButton } from "@mui/lab";
import { InputText, InputSelect, InputPrice } from "../../../components";
import { useFetchCategories } from "../../../queries";
import { useFetchPostProduct } from "../../../mutations";
import { TPostSaveProductRequestBody } from "cakes-lib-types-js";

const ItemGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export function CreateProductForm() {
  const {
    name,
    price,
    description,
    categoryId,
    size,
    filling,
    dough,
    flavor,
    status,
    setField,
    reset,
  } = useProductFormStore();
  const { validate, errors } = useValidationProductForm();

  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
  } = useFetchCategories({});

  const { mutate, isLoading: isProductPending } = useFetchPostProduct();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
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
    const dataToValidate = { name, price, categoryId, status };
    if (!validate(dataToValidate)) {
      setNotification({
        open: true,
        message: "Por favor, corrija os erros do formulário.",
        severity: "error",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description || "");
    formData.append("status", status);
    formData.append("categoryId", categoryId);
    formData.append("dough", dough);
    formData.append("filling", filling);
    formData.append("flavor", flavor);
    formData.append("size", size);
    formData.append("price", price.replace(",", "."));

    if (imageFile) {
      formData.append("image", imageFile);
    }
    // mutate(formData, {
    //   onSuccess: () => {
    reset();
    setImageFile(null);
    setImagePreview(null);
    setNotification({
      open: true,
      message: "Produto cadastrado com sucesso!",
      severity: "success",
    });

    window.location.href = "/produtos";
    //   },
    //   onError: (error: any) => {
    //     const errorMessage =
    //       error.response?.data?.message || "Erro ao cadastrar produto";
    //     setNotification({
    //       open: true,
    //       message: errorMessage,
    //       severity: "error",
    //     });
    //   },
    // });
  };

  const isLoading = isCategoriesLoading || isProductPending;

  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h6" gutterBottom marginBottom={2}>
        Cadastro de Produto
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
            <ItemGrid size={{ xs: 12, md: 6, lg: 4 }}>
              <InputText
                id="name"
                label="Nome do Produto"
                value={name}
                onChange={(e) => setField("name", e.target.value)}
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 4 }}>
              <InputPrice
                id="price"
                label="Preço do Produto"
                value={price}
                onChange={(e) => setField("price", e.target.value)}
                required
                error={!!errors.price}
                helperText={errors.price}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 4 }}>
              {isCategoriesLoading ? (
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={20} />
                  <FormLabel>Carregando categorias...</FormLabel>
                </Box>
              ) : isCategoriesError ? (
                <FormLabel error>Erro ao carregar categorias.</FormLabel>
              ) : (
                <InputSelect
                  id="categoryId"
                  label="Categoria"
                  value={categoryId}
                  onChange={(e: SelectChangeEvent<string>) =>
                    setField("categoryId", e.target.value)
                  }
                  options={
                    categoriesData?.data?.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    })) || []
                  }
                  required
                  error={!!errors.categoryId}
                  helperText={errors.categoryId}
                  disabled={
                    !categoriesData?.data || categoriesData.data.length === 0
                  }
                />
              )}
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 3 }}>
              <InputText
                id="flavor"
                label="Sabor"
                value={flavor}
                onChange={(e) => setField("flavor", e.target.value)}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 3 }}>
              <InputText
                id="size"
                label="Tamanho"
                value={size}
                onChange={(e) => setField("size", e.target.value)}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 3 }}>
              <InputText
                id="filling"
                label="Recheio"
                value={filling}
                onChange={(e) => setField("filling", e.target.value)}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 3 }}>
              <InputText
                id="dough"
                label="Massa"
                value={dough}
                onChange={(e) => setField("dough", e.target.value)}
              />
            </ItemGrid>

            <ItemGrid size={{ xs: 12, md: 6, lg: 12 }}>
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
                Cadastrar produto
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
