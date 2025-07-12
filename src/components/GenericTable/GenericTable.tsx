import React, { useState } from "react";
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  CircularProgress,
  Typography,
  Paper,
  TablePagination,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { ITableGenericProps } from "./GenericTable.types";

export function TableGeneric<T>({
  data,
  initialPage = 0,
  initialRowsPerPage = 10,
  columns,
  isLoading,
  isError,
  onEdit,
  onDelete,
  getId,
}: ITableGenericProps<T>) {
  const [page, setPage] = useState(initialPage);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box py={4}>
        <Typography color="error" align="center">
          Erro ao carregar os dados.
        </Typography>
      </Box>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Box py={4}>
        <Typography align="center">Nenhum dado encontrado.</Typography>
      </Box>
    );
  }

  const paginatedData = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
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
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx} align={col.align ?? "left"}>
                  {col.label}
                </TableCell>
              ))}
              {(onEdit || onDelete) && <TableCell align="right" />}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={getId(row)}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} align={col.align ?? "left"}>
                    {typeof col.field === "function"
                      ? col.field(row, index + page * rowsPerPage)
                      : (row[col.field] as React.ReactNode)}
                  </TableCell>
                ))}
                {(onEdit || onDelete) && (
                  <TableCell align="right">
                    {onEdit && (
                      <Tooltip title="Editar">
                        <IconButton onClick={() => onEdit(getId(row))}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                    {onDelete && (
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => onDelete(getId(row))}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
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
  );
}
