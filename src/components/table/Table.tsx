"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { FileType } from "@/types";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useAppStore } from "../../../store/store";
import { DeleteModal } from "../DeleteModal";
import RenameModal from "../RenameModal";
import { DataTablePagination } from "./DataTablePagination";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    });

    // Delete and Rename Actions (using Zustand)
    const [setIsDeleteModalOpen, setFileId, setFilename, setIsRenameModalOpen] =
        useAppStore((state) => [
            state.setIsDeleteModalOpen,
            state.setFileId,
            state.setFilename,
            state.setIsRenameModalOpen,
        ]);

    const openDeleteModal = (fileId: string) => {
        setFileId(fileId);
        setIsDeleteModalOpen(true);
    };

    // Rename Modal
    const openRenameModal = (fileId: string, filename: string) => {
        setFileId(fileId);
        setFilename(filename);
        setIsRenameModalOpen(true);
    };

    return (
        <>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter filenames..."
                    value={
                        (table
                            .getColumn("filename")
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn("filename")
                            ?.setFilterValue(event.target.value)
                    }
                    className="md:max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="hover:bg-transparent"
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {/* Add Delete and Rename Modals */}
                                    <DeleteModal />
                                    <RenameModal />
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {/* Beautify the timestamp */}
                                            {cell.column.id === "timestamp" ? (
                                                <div className="flex flex-col">
                                                    <div className="text-sm">
                                                        {(
                                                            cell.getValue() as Date
                                                        ).toLocaleDateString()}
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        {(
                                                            cell.getValue() as Date
                                                        ).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            ) : // Add Edit action and icon
                                            cell.column.id === "filename" ? (
                                                <p
                                                    className="flex items-center text-blue-500 hover:text-blue-600 hover:cursor-pointer hover:underline"
                                                    onClick={() => {
                                                        openRenameModal(
                                                            (
                                                                row.original as FileType
                                                            ).id,
                                                            (
                                                                row.original as FileType
                                                            ).filename
                                                        );
                                                    }}
                                                >
                                                    {cell.getValue() as string}{" "}
                                                    <PencilIcon
                                                        size={15}
                                                        className="ml-12"
                                                    />
                                                </p>
                                            ) : (
                                                flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )
                                            )}
                                        </TableCell>
                                    ))}
                                    {/* Add Delete Cell */}
                                    <TableCell
                                        key={(row.original as FileType).id}
                                    >
                                        <Button
                                            variant={"outline"}
                                            onClick={() => {
                                                openDeleteModal(
                                                    (row.original as FileType)
                                                        .id
                                                );
                                            }}
                                        >
                                            <TrashIcon size={16} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table} />
        </>
    );
}
