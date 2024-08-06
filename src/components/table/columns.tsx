"use client";

import { FileType } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FileIcon, defaultStyles } from "react-file-icon";
import prettyBytes from "pretty-bytes";
import { COLOR_EXTENSION_MAP } from "@/constants";

export const columns: ColumnDef<FileType>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ renderValue, ...props }) => {
            const type = renderValue() as string;
            const extension: string = type.split("/")[1];
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
        header: "Filename",
    },
    {
        accessorKey: "timestamp",
        header: "Date added",
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ renderValue, ...props }) => {
            return <span>{prettyBytes(renderValue() as number)}</span>;
        },
    },
    {
        accessorKey: "downloadURL",
        header: "Link",
        cell: ({ renderValue, ...props }) => {
            return (
                <a
                    href={renderValue() as string}
                    target="_blank"
                    className="underline text-blue-500 hover:text-blue-600"
                >
                    Open File
                </a>
            );
        },
    },
    // alternative to directly download the Files, but requires CORS config in Firebase Console
    // {
    //     accessorKey: "downloadURL",
    //     header: "Link",
    //     cell: ({ renderValue, ...props }) => {
    //         const url = renderValue() as string;
    //         const filename = url.split("/").pop() || "file"; // Extract filename from URL

    //         const handleDownload = async () => {
    //             try {
    //                 const response = await fetch(url);
    //                 if (!response.ok) throw new Error("Failed to fetch file");

    //                 const blob = await response.blob();
    //                 const objectURL = URL.createObjectURL(blob);

    //                 // Create a temporary link element
    //                 const link = document.createElement("a");
    //                 link.href = objectURL;
    //                 link.download = filename; // Set filename for download
    //                 document.body.appendChild(link); // Append link to the document
    //                 link.click(); // Trigger click event
    //                 document.body.removeChild(link); // Remove link from the document

    //                 URL.revokeObjectURL(objectURL); // Clean up object URL
    //             } catch (error) {
    //                 console.error("Error downloading file:", error);
    //             }
    //         };

    //         return (
    //             <button
    //                 onClick={handleDownload}
    //                 className="underline text-blue-500 hover:text-blue-600"
    //             >
    //                 Download
    //             </button>
    //         );
    //     },
    // },
];
