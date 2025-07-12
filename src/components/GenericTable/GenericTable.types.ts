export interface IColumn<T> {
  label: string;
  field: keyof T | ((row: T, index?: number) => React.ReactNode | string | number | null);
  align?: "right" | "left" | "center";
}

export interface ITableGenericProps<T> {
  columns: IColumn<T>[];
  data: T[];
  isLoading: boolean;
  isError: boolean;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  getId: (row: T) => string | number;
  initialPage?: number;
  initialRowsPerPage?: number;
}