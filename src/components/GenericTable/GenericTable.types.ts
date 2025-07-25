export interface IColumn<T> {
  label: string;
  field: keyof T | ((row: T, index?: number) => React.ReactNode | string | number | null);
  align?: "right" | "left" | "center";
}

export interface ITableGenericProps<T> {
  data: T[];
  columns: IColumn<T>[];
  isLoading: boolean;
  isError: boolean;
  getId: (row: T) => string | number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  total: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}