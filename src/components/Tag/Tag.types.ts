export type TagColor = "yellow" | "blue" | "green" | "gray" | "red";

export interface ITagProps {
  text: string;
  color: TagColor;
}

export const colorMap: Record<TagColor, string> = {
  yellow: "bg-yellow-100 text-yellow-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  gray: "bg-gray-200 text-gray-800",
  red: "bg-red-100 text-red-800",
};

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'IN_PREPARATION' | 'READY' | 'COMPLETED' | 'CANCELED';

export const statusConfig: Record<OrderStatus, { text: string; color: TagColor }> = {
  PENDING:          { text: 'Pendente',          color: 'yellow' },
  CONFIRMED:        { text: 'Confirmado',        color: 'blue' },
  IN_PREPARATION:   { text: 'Em Preparo',        color: 'blue' },
  READY:            { text: 'Pronto p/ Entrega', color: 'green' },
  COMPLETED:        { text: 'Finalizado',        color: 'gray' },
  CANCELED:         { text: 'Cancelado',         color: 'red' },
};
