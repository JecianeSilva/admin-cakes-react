import React, { useEffect, useState } from "react";
import {
  Box,
  FormLabel,
  Grid,
  Typography,
  Snackbar,
  Alert,
  SelectChangeEvent,
  Container,
  Card,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { InputSelect, InputText } from "../../../components";
import { LoadingButton } from "@mui/lab";
import { useValidationCategoryForm } from "./hook";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchCategoryById } from "../../../queries";
import { useCategoryFormStore } from "../../../store";
import { useFetchPutCategory } from "../../../mutations";
import { TPutCategoryRequestBody } from "cakes-lib-types-js";
import { environment } from "../../../enrironments";

const ItemGrid = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
});

export function EditionCategoryForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: initialData, isLoading: isLoadingData } = useFetchCategoryById(
    id!
  );

  const { name, description, status, image, setField, reset, setAllFields } =
    useCategoryFormStore();
  const { validate, errors } = useValidationCategoryForm();
  const { mutate: updateCategory, isLoading: isLoading } =
    useFetchPutCategory();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | undefined>(image);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  useEffect(() => {
    if (initialData) {
      setAllFields({
        name: initialData.name,
        description: initialData.description || "",
        status: initialData.status,
        image: initialData.image || undefined,
      });
      const fullImageUrl = `${environment.VITE_API_IMAGE_URL}${initialData.image}`;
      setImagePreview(fullImageUrl);
    }
    return () => reset();
  }, [initialData, setAllFields, reset]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(initialData?.image || undefined);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate({ name, status })) {
      setNotification({
        open: true,
        message: "Por favor, corrija os erros do formulário.",
        severity: "error",
      });
      return;
    }

    const categoryUpdateData: TPutCategoryRequestBody = {
      name,
      description: description || undefined,
      status: status,
    };

    updateCategory(
      { id: id!, data: categoryUpdateData, image: imageFile },
      {
        onSuccess: () => {
          setNotification({
            open: true,
            message: "Categoria atualizada com sucesso!",
            severity: "success",
          });
          navigate("/categorias");
        },
        onError: (error: any) => {
          const errorMessage =
            error.response?.data?.message || "Erro ao atualizar categoria";
          setNotification({
            open: true,
            message: errorMessage,
            severity: "error",
          });
        },
      }
    );
  };

  if (isLoadingData) {
    return (
      <Box display="flex" justifyContent="center" py={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h5" gutterBottom marginBottom={2}>
        Editar Categoria
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
            <ItemGrid size={{ xs: 12, md: 6, lg: 4 }}>
              <InputSelect
                id="status"
                label="Status"
                value={status}
                onChange={(e: SelectChangeEvent<string>) =>
                  setField("status", e.target.value)
                }
                options={[
                  {
                    value: "ACTIVATED",
                    label: "Ativado",
                  },
                  { value: "DISABLED", label: "Desativado" },
                ]}
                error={!!errors.status}
                helperText={errors.status}
                disabled={isLoading}
                required
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
                Salvar
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
