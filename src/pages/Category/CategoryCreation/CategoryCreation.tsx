import React, { useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Grid,
  OutlinedInput,
  Typography,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { authorizedApi } from "src/services";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));

export function CreateCategoryForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "ACTIVATED", // novo campo status
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleStatusChange = (e: SelectChangeEvent) => {
    setForm((prev) => ({ ...prev, status: e.target.value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("status", form.status); // usado no backend como enum
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await authorizedApi.post("/cakes-bff/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setNotification({
        open: true,
        message: "Categoria cadastrada com sucesso!",
        severity: "success",
      });

      setForm({ name: "", description: "", status: "ACTIVATED" });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      setNotification({
        open: true,
        message: "Erro ao cadastrar categoria",
        severity: "error",
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Cadastro de Categoria
        </Typography>

        <Grid container spacing={3} alignItems="flex-start">
          <FormGrid>
            <FormLabel required>Nome da Categoria</FormLabel>
            <OutlinedInput
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Ex: Massas"
              required
              size="small"
            />
          </FormGrid>

          <FormGrid>
            <FormLabel>Imagem</FormLabel>
            <input type="file" accept="image/*" onChange={handleImageSelect} />
            {imagePreview && (
              <Box
                mt={1}
                sx={{
                  width: 120,
                  height: 80,
                  borderRadius: 1,
                  overflow: "hidden",
                  border: "1px solid #ccc",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            )}
          </FormGrid>

          <FormGrid>
            <FormLabel>Descrição (opcional)</FormLabel>
            <OutlinedInput
              multiline
              minRows={3}
              value={form.description}
              onChange={handleChange("description")}
              placeholder="Breve descrição"
              size="small"
            />
          </FormGrid>

          <FormGrid>
            <FormLabel>Status</FormLabel>
            <Select
              size="small"
              value={form.status}
              onChange={handleStatusChange}
            >
              <MenuItem value="ACTIVATED">Ativado</MenuItem>
              <MenuItem value="DISABLED">Desativado</MenuItem>
            </Select>
          </FormGrid>

          <Grid display="flex" alignItems="flex-end">
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={5000}
        onClose={() => setNotification({ ...notification, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setNotification({ ...notification, open: false })}
          severity={notification.severity}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}
