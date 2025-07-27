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

    const productData: TPostSaveProductRequestBody = {
      categoryId,
      name,
      price: parseFloat(price.replace(",", ".")),
      description,
      dough,
      filling,
      flavor,
      size,
      status,
    };

    // mutate(
    //   { productData, image: imageFile },
    //   {
    //     onSuccess: () => {
    //       reset();
    //       setImageFile(null);
    //       setImagePreview(null);
    //       setNotification({
    //         open: true,
    //         message: "Produto cadastrado com sucesso!",
    //         severity: "success",
    //       });
    //     },
    //     onError: (error: any) => {
    //       const errorMessage =
    //         error.response?.data?.message || "Erro ao cadastrar produto";
    //       setNotification({
    //         open: true,
    //         message: errorMessage,
    //         severity: "error",
    //       });
    //     },
    //   }
    // );
  };

  const isLoading = isCategoriesLoading || isProductPending;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ padding: "24px 16px" }}
      >
        <Typography variant="h6" gutterBottom marginBottom={2}>
          Cadastro de Produto
        </Typography>
        <Grid container spacing={3} alignItems="flex-start">
          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
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

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
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

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
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

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="flavor"
              label="Sabor"
              value={flavor}
              onChange={(e) => setField("flavor", e.target.value)}
            />
          </ItemGrid>

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="size"
              label="Tamanho"
              value={size}
              onChange={(e) => setField("size", e.target.value)}
            />
          </ItemGrid>

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="filling"
              label="Recheio"
              value={filling}
              onChange={(e) => setField("filling", e.target.value)}
            />
          </ItemGrid>

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="dough"
              label="Massa"
              value={dough}
              onChange={(e) => setField("dough", e.target.value)}
            />
          </ItemGrid>

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="description"
              label="Descrição"
              value={description || ""}
              onChange={(e) => setField("description", e.target.value)}
              multiline
              rows={3}
            />
          </ItemGrid>

          <ItemGrid sx={{ xs: 12, md: 6, lg: 4 }}>
            <FormLabel htmlFor="image">Imagem (Opcional)</FormLabel>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {imagePreview && (
              <Box
                mt={1}
                sx={{ width: 120, height: 80, border: "1px solid #ccc" }}
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

          <Grid>
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              Cadastrar Produto
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
