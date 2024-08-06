import { auth } from "@clerk/nextjs/server";
import { db } from "@/firebase";
import GalleryHeader from "@/components/GalleryHeader";
import { ThemeProvider } from "@/components/ThemeProvider";
import Dropzone from "@/components/Dropzone";
import { FileType } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import TableWrapper from "@/components/table/TableWrapper";

async function Gallery() {
    const { userId } = auth();

    const docsResults = await getDocs(
        collection(db, "users", userId!, "files")
    );

    const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
        id: doc.id,
        filename: doc.data().filename || doc.id,
        timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
        fullName: doc.data().fullName,
        downloadURL: doc.data().downloadURL,
        type: doc.data().type,
        size: doc.data().size,
    }));

    // console.log(skeletonFiles);

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <GalleryHeader />
            <main className="border-t">
                <Dropzone />
                <section className="container space-y-5">
                    <h2 className="font-bold">All files</h2>
                    <div>
                        <TableWrapper skeletonFiles={skeletonFiles} />
                    </div>
                </section>
            </main>
        </ThemeProvider>
    );
}

export default Gallery;
