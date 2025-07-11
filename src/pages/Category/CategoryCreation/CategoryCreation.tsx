import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  OutlinedInput,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { authorizedApi } from "src/services";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export function CreateCategoryForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    isVisible: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = field === "isVisible" ? e.target.checked : e.target.value;
      setForm((prev) => ({ ...prev, [field]: value }));
    };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("isVisible", String(form.isVisible));
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
      setForm({ name: "", description: "", isVisible: true });
      setImageFile(null);
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

        <Grid container spacing={3}>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={form.isVisible}
                  onChange={handleChange("isVisible")}
                />
              }
              label="Categoria visível"
            />
          </FormGrid>

          <Grid>
            <Button type="submit" variant="contained" color="primary">
              Cadastrar Categoria
            </Button>
          </Grid>
        </Grid>
      </form>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
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
