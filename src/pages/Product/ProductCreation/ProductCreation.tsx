import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  OutlinedInput,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  TextField,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import { useProductFormStore } from "./store";
import { useValidationProductForm } from "./hook/useValidationProductForm";
import { LoadingButton } from "@mui/lab";
import { InputText } from "../../../components";
import { useFetchCategories } from "../../../queries";
import { InputSelect } from "../../../components/InputSelect/InputSelect";
import { InputPrice } from "../../../components/InputPrice";
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
    imageUrl,
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
    data: categories = [],
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    refetch,
  } = useFetchCategories();

  const { mutate, isLoading: isProductLoading } = useFetchPostProduct();

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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

    const body: TPostSaveProductRequestBody = {
      categoryId,
      name,
      price: parseFloat(price.replace(",", ".")),
      description,
      dough,
      filling,
      flavor,
      // image_url,
      size,
      status,
    };
    // if (imageFile) {
    //   formData.append("image", imageFile);
    // }

    mutate(body, {
      onSuccess: () => {
        reset();
        setImageFile(null);
        setImagePreview(null);
        setNotification({
          open: true,
          message: "Produto cadastrado com sucesso!",
          severity: "success",
        });
      },
      onError: (error) => {
        console.error("Erro ao cadastrar produto:", error);
        setNotification({
          open: true,
          message:
            (error.response?.data as any)?.message ||
            "Erro ao cadastrar produto",
          severity: "error",
        });
      },
    });
  };

  const isLoading = isCategoriesLoading || isProductLoading;

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ marginLeft: "unset", padding: "24px 16px" }}
      >
        <Typography variant="h6" gutterBottom marginBottom={2}>
          Cadastro de Produto
        </Typography>
        <Grid container spacing={3} alignItems="flex-start">
          <ItemGrid size={{ xs: 12, md: 6, lg: 4 }}>
            <InputText
              id="name"
              label="Nome do Produto"
              value={name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="Digite o nome"
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
              placeholder="R$ 0,00"
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
              <FormLabel error>
                Erro ao carregar categorias. Tente novamente.
              </FormLabel>
            ) : (
              <InputSelect
                id="categoryId"
                label="Categoria"
                value={categoryId}
                onChange={(e: SelectChangeEvent<string>) =>
                  setField("categoryId", e.target.value)
                }
                options={categories.map((cat) => ({
                  value: cat.id,
                  label: cat.name,
                }))}
                required
                error={!!errors.categoryId}
                helperText={errors.categoryId}
                disabled={!categories || categories.length === 0}
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

          <ItemGrid size={{ xs: 12 }}>
            <InputText
              id="description"
              label="Descrição"
              value={description}
              onChange={(e) => setField("description", e.target.value)}
              multiline
              rows={3}
            />
          </ItemGrid>

          <ItemGrid size={{ xs: 12, md: 6 }}>
            <FormLabel htmlFor="image">Imagem</FormLabel>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {imagePreview && (
              <Box
                mt={1}
                sx={{ width: 120, height: 80, border: "1px solid #ccc" }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
    </>
  );
}
