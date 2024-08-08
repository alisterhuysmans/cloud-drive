import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/firebase";
import Dropzone from "@/components/Dropzone";
import { FileType } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import TableWrapper from "@/components/table/TableWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Cloud Drive",
    description: "Manage your files seamlessly",
};

async function Dashboard() {
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

    const user = await currentUser();

    let displayName = "";
    if (user?.firstName || user?.lastName) {
        if (user?.firstName) displayName += user.firstName;
        if (user?.lastName)
            displayName += (displayName ? " " : "") + user.lastName;
    } else if (user?.emailAddresses && user.emailAddresses.length > 0) {
        displayName = user.emailAddresses[0].emailAddress;
    } else {
        displayName = "User";
    }

    return (
        <main className="border-t space-y-5">
            <Dropzone />
            <section className="p-3 container">
                <div className="flex justify-end items-center space-x-2">
                    <h2 className="text-gray-400 font-normal">Connected as</h2>
                    <span>{displayName}</span>
                </div>
                <div>
                    <TableWrapper skeletonFiles={skeletonFiles} />
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
