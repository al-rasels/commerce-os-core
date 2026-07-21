import type { ReactNode } from 'react';
import { DataTable as BaseDataTable, type Column as BaseColumn } from '@commerceos/components';

interface TanStackColumn<T> {
  accessorKey: string;
  header: string;
  cell?: (props: { row: { original: T } }) => ReactNode;
}

interface DataTableProps<T> {
  columns: TanStackColumn<T>[];
  data: T[];
}

export function DataTable<T extends Record<string, unknown>>({ columns, data }: DataTableProps<T>) {
  const adaptedColumns: BaseColumn<T>[] = columns.map((col) => ({
    key: col.accessorKey,
    label: col.header,
    render: col.cell ? (item: T) => col.cell!({ row: { original: item } }) : undefined,
  }));

  return <BaseDataTable columns={adaptedColumns} data={data} keyField="id" />;
}
