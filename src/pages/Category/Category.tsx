import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Typography,
} from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "src/queries";
import { TableGeneric } from "../../components";
import { ICategory } from "cakes-lib-types-js";
import { useState } from "react";

export function Category() {
  const navigate = useNavigate();
  const { data = [], isLoading, isError, refetch } = useFetchCategories();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleEdit = (id: string | number) => {
    navigate(`/categories/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/categoria/cadastrar");
  };

  const handleDelete = (id: string | number) => {
    console.log("Deletar categoria ID:", id);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Categorias
      </Typography>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <IconButton onClick={() => refetch()}>
          <Refresh />
        </IconButton>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ textTransform: "none" }}
          onClick={handleCreate}
        >
          Cadastrar Categoria
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableGeneric<ICategory>
          data={data}
          columns={[
            { label: "Nome", field: "name" },
            { label: "Descrição", field: (row) => row.description || "-" },
            {
              label: "Status",
              field: (row) =>
                row.status === "ACTIVATED" ? "Ativo" : "Desativado",
            },
          ]}
          isLoading={isLoading}
          isError={isError}
          getId={(row) => row.id}
          onEdit={handleEdit}
          onDelete={handleDelete}
          initialPage={page}
          initialRowsPerPage={rowsPerPage}
        />
      )}
    </Container>
  );
}
