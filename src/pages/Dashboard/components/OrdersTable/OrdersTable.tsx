import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
} from "@mui/material";
import { Tag } from "../../../../components";
import { TagColor } from "../../../../components/Tag/Tag.types";

interface Order {
  id: string;
  clientName: string;
  deliveryTime: string;
  status: OrderStatus;
}

interface OrdersTableProps {
  orders: Order[];
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "IN_PREPARATION"
  | "READY"
  | "COMPLETED"
  | "CANCELED";

export const statusConfig: Record<
  OrderStatus,
  { text: string; color: TagColor }
> = {
  PENDING: { text: "Pendente", color: "yellow" },
  CONFIRMED: { text: "Confirmado", color: "blue" },
  IN_PREPARATION: { text: "Em Preparo", color: "blue" },
  READY: { text: "Pronto p/ Entrega", color: "green" },
  COMPLETED: { text: "Finalizado", color: "gray" },
  CANCELED: { text: "Cancelado", color: "red" },
};

const mockOrders: Order[] = [
  {
    id: "#1152",
    clientName: "Ana Silva",
    deliveryTime: "10:00",
    status: "IN_PREPARATION",
  },
  {
    id: "#1148",
    clientName: "Bruno Costa",
    deliveryTime: "11:30",
    status: "PENDING",
  },
  {
    id: "#1145",
    clientName: "Robson & Filhos",
    deliveryTime: "16:00",
    status: "READY",
  },
  {
    id: "#1139",
    clientName: "Maria Oliveira",
    deliveryTime: "18:30",
    status: "COMPLETED",
  },
  {
    id: "#1130",
    clientName: "Carlos Souza",
    deliveryTime: "19:00",
    status: "CANCELED",
  },
];
export function OrdersTable({ orders = mockOrders }: OrdersTableProps) {
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" component="h3" fontWeight="bold" sx={{ p: 2 }}>
        ⚡ Pedidos para Hoje
      </Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {orders.map((order) => {
              const currentStatus = statusConfig[order.status];

              return (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.clientName}</TableCell>
                  <TableCell>{order.deliveryTime}</TableCell>
                  <TableCell>
                    <Tag
                      text={currentStatus.text}
                      color={currentStatus.color}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      size="small"
                      href={`/`}
                      // href={`/pedidos/${order.id}`}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
