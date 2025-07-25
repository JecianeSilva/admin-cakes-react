import React from "react";
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
  columns,
  isLoading,
  isError,
  onEdit,
  onDelete,
  getId,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: ITableGenericProps<T>) {
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

  return (
    <Paper
      elevation={3}
      sx={{
        maxWidth: "100%",
        borderRadius: 1,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
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
            {data.map((row, index) => (
              <TableRow key={getId(row)}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} align={col.align ?? "left"}>
                    {typeof col.field === "function"
                      ? col.field(row, index)
                      : (row[col.field as keyof T] as React.ReactNode)}
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
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={total}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        labelRowsPerPage="Linhas por página:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`
        }
      />
    </Paper>
  );
}
