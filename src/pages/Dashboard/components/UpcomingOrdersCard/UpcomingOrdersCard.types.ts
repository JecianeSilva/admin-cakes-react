export interface IUpcomingOrdersProps {
  ordersByDate: Record<string, { id: string; clientName: string; status: 'Pendente' }[]>;
}