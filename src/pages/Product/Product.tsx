import {
  Box,
  Button,
  IconButton,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { Add, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFetchProducts } from "../../queries/getProducts";
import { TableGeneric } from "../../components";
import { IProduct } from "cakes-lib-types-js";
import { useState } from "react";

export function Product() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError, refetch } = useFetchProducts({
    page: page + 1,
    limit: rowsPerPage,
  });

  const handleEdit = (id: string | number) => {
    navigate(`/produtos/editar/${id}`);
  };

  const handleCreate = () => {
    navigate("/produtos/cadastrar");
  };

  const handleDelete = (id: string | number) => {
    console.log("Deletar product ID:", id);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isError) {
    return <>ERROR</>;
  }
  return (
    <Container maxWidth={false} sx={{ marginLeft: "unset", maxWidth: "100%" }}>
      <Typography variant="h5" gutterBottom>
        Produtos
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
          Cadastrar Produto
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <TableGeneric<IProduct>
          data={data?.data || []}
          total={data?.total || []}
          columns={[
            { label: "Nome", field: "name" },
            { label: "Categoria", field: (row) => row.category.name ?? "-" },
            {
              label: "Preço",
              field: (row) => "R$ " + row.price.toString().replace(".", ","),
            },
            {
              label: "Sabor",
              field: (row) => row.flavor || "-",
            },
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
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
    </Container>
  );
}
