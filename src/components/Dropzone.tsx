"use client";

import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
    addDoc,
    collection,
    doc,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import DropzoneComponent from "react-dropzone";
import toast from "react-hot-toast";

function DropZone() {
    const [loading, setLoading] = useState<boolean>(false);
    const { isLoaded, isSignedIn, user } = useUser();

    const onDrop = (acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onabort = () => console.log("file reading has failed");

            reader.onload = async () => {
                await uploadPost(file);
            };
            reader.readAsArrayBuffer(file);
        });
    };

    const uploadPost = async (selectedFile: File) => {
        if (loading) return;
        if (!user) return;

        setLoading(true);

        const toastId = toast.loading("Uploading...");

        // do what needs to be done
        // addDoc -> user/user123/files

        const docRef = await addDoc(collection(db, "users", user.id, "files"), {
            userId: user.id,
            filename: selectedFile.name,
            fullName: user.fullName,
            timestamp: serverTimestamp(),
            type: selectedFile.type,
            size: selectedFile.size,
        });

        const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

        uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
            const downloadURL = await getDownloadURL(imageRef);

            await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
                downloadURL: downloadURL,
            });
        });

        toast.success("Uploaded Successfully", {
            id: toastId,
        });
        setLoading(false);
    };

    const maxSize = 209771520;

    return (
        <DropzoneComponent minSize={0} maxFiles={maxSize} onDrop={onDrop}>
            {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragReject,
                fileRejections,
            }) => {
                const isFileTooLarge =
                    fileRejections.length > 0 &&
                    fileRejections[0].file.size > maxSize;

                return (
                    <section>
                        <div
                            className={cn(
                                "h-52 flex justify-center items-center p-5 m-3 border border-dashed rounded-lg text-center text-lg font-medium hover:cursor-pointer",
                                isDragActive
                                    ? "bg-slate-600/50 dark:bg-slate-600/80 text-white animate-pulse"
                                    : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
                            )}
                            {...getRootProps()}
                        >
                            <input {...getInputProps()} className="text-2xl" />
                            {!isDragActive &&
                                "Click here or drop a file to upload!"}
                            {isDragActive &&
                                !isDragReject &&
                                "Drop to upload this file!"}
                            {isDragReject &&
                                "This type of file is not supported!"}
                            {isFileTooLarge && (
                                <div className="text-danger mt-2">
                                    File is too large.
                                </div>
                            )}
                        </div>
                    </section>
                );
            }}
        </DropzoneComponent>
    );
}

export default DropZone;
