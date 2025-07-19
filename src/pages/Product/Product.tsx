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

export function Product() {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useFetchProducts();
  const page = 0;
  const rowsPerPage = 5;

  const handleEdit = (id: string | number) => {
    navigate(`/produto/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/produtos/cadastrar");
  };

  const handleDelete = (id: string | number) => {
    console.log("Deletar product ID:", id);
  };

  if (isError) {
    return <>ERROR</>;
  }
  return (
    <Container maxWidth={"lg"}>
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
          data={data || []}
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
          initialPage={page}
          initialRowsPerPage={rowsPerPage}
        />
      )}
    </Container>
  );
}
