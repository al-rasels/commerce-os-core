"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "./utils";
import { ChevronDown, ChevronUp, ChevronsUpDown, Search } from "lucide-react";
import { Input } from "./input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  className?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  const { rows } = table.getRowModel();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    overscan: 10,
  });

  return (
    <div className={cn("space-y-4", className)}>
      {searchKey && (
        <div className="flex items-center">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? globalFilter ?? ""}
              onChange={(event) => {
                if (searchKey && table.getColumn(searchKey)) {
                  table.getColumn(searchKey)?.setFilterValue(event.target.value);
                } else {
                  setGlobalFilter(event.target.value);
                }
              }}
              className="pl-9 h-10"
            />
          </div>
        </div>
      )}

      <div
        ref={parentRef}
        className="rounded-md border bg-card relative max-h-[600px] overflow-auto shadow-sm"
      >
        <Table className="relative w-full">
          <TableHeader className="sticky top-0 z-10 bg-muted/80 backdrop-blur-md shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                      className="px-4 whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center gap-1 transition-colors hover:text-foreground group"
                              : "flex items-center",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <ChevronUp className="size-4" />,
                            desc: <ChevronDown className="size-4" />,
                          }[header.column.getIsSorted() as string] ?? (
                            header.column.getCanSort() ? (
                              <ChevronsUpDown className="size-4 opacity-0 group-hover:opacity-100 text-muted-foreground transition-opacity" />
                            ) : null
                          )}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.length > 0 ? (
              <>
                {/* Virtualization top padding */}
                {virtualizer.getVirtualItems().length > 0 && virtualizer.getVirtualItems()[0].start > 0 && (
                  <tr>
                    <td style={{ height: `${virtualizer.getVirtualItems()[0].start}px` }} />
                  </tr>
                )}
                {virtualizer.getVirtualItems().map((virtualRow) => {
                  const row = rows[virtualRow.index];
                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      data-index={virtualRow.index}
                      ref={virtualizer.measureElement}
                      className="group"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                {/* Virtualization bottom padding */}
                {virtualizer.getVirtualItems().length > 0 && (
                  <tr>
                    <td style={{ height: `${virtualizer.getTotalSize() - virtualizer.getVirtualItems()[virtualizer.getVirtualItems().length - 1].end}px` }} />
                  </tr>
                )}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
