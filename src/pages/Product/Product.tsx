import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Tooltip,
  CircularProgress,
  Paper,
  Container,
} from "@mui/material";
import { Add, Delete, Edit, Refresh } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchProducts } from "../../queries/getProducts";

export function Product() {
  const navigate = useNavigate();
  const { data = [], isLoading, refetch } = useFetchProducts();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id: string | number) => {
    navigate(`/produto/edit/${id}`);
  };

  const handleCreate = () => {
    navigate("/produto/cadastrar");
  };

  const handleDelete = (id: string | number) => {
    console.log("Deletar product ID:", id);
    // Adicionar mutate de exclusão aqui com confirmação
  };

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
          Cadastrar novo Produto
        </Button>
      </Box>

      {isLoading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper
          elevation={3}
          sx={{
            maxWidth: "100%",
            borderRadius: 2,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            minWidth={"md"}
            sx={{
              overflowX: "auto",
              width: "100%",
            }}
          >
            <Table
              sx={{
                overflow: "auto",
                minWidth: "800px",
                width: "100%",
              }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Categoria</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right" />
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((productData, index) => (
                    <TableRow key={productData.id}>
                      <TableCell>#{index + 1}</TableCell>
                      <TableCell>{productData.name}</TableCell>
                      <TableCell>{productData.category.name}</TableCell>
                      <TableCell>{productData.price}</TableCell>
                      <TableCell>
                        {productData.status === "ACTIVATED"
                          ? "Ativo"
                          : "Desativado"}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="Editar">
                          <IconButton
                            onClick={() => handleEdit(productData.id)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton
                            onClick={() => handleDelete(productData.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>

          <TablePagination
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </Container>
  );
}
