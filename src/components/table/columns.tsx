"use client";

import { FileType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon, defaultStyles } from "react-file-icon";
import { ArrowUpDown } from "lucide-react";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENSION_MAP } from "@/constants";
import { Button } from "../ui/button";

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension = type.split("/")[1];
            return (
                <div className="w-10">
                    <FileIcon
                        extension={extension}
                        labelColor={COLOR_EXTENSION_MAP[extension]}
                        // @ts-ignore
                        {...defaultStyles[extension]}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "filename",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="p-0 hover:bg-transparent"
            >
                Filename
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "timestamp",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="p-0 hover:bg-transparent"
            >
                Date added
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => (
            <span>{prettyBytes(renderValue() as number)}</span>
        ),
    },
    {
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => (
            <a
                href={renderValue() as string}
                target="_blank"
                className="text-blue-500 hover:text-blue-600 hover:underline"
            >
                Open
            </a>
        ),
    },
];
