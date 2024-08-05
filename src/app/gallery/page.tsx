"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useState, useEffect } from "react";
import GalleryHeader from "@/components/GalleryHeader";

const firebaseConfig = {
    apiKey: "AIzaSyAlBIz2ZlyDYtM8ANSF4tuRP_WNtVz-iqY",
    authDomain: "photography-website-b0d26.firebaseapp.com",
    databaseURL:
        "https://photography-website-b0d26-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "photography-website-b0d26",
    storageBucket: "photography-website-b0d26.appspot.com",
    messagingSenderId: "155287365176",
    appId: "1:155287365176:web:81791a4ba50dedc218e8cd",
    measurementId: "G-SQMZPWYCHY",
};

// Connect to Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

export default function FirebaseUI() {
    const { getToken, userId, isLoaded, isSignedIn } = useAuth();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // Sign in or sign up with Clerk
    const signInWithClerk = async () => {
        if (isSignedIn) {
            console.log("User is already signed in with Clerk");
            return;
        }

        try {
            // Initiate Clerk's sign-in flow if the user is not signed in
            // This typically involves redirecting or showing a Clerk sign-in UI component
            // Since the implementation of Clerk's UI might vary, make sure to follow Clerk's documentation
        } catch (error) {
            console.error("Error during Clerk sign-in/sign-up:", error);
        }
    };

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            try {
                if (!isSignedIn) {
                    console.error("User is not authenticated.");
                    return;
                }

                const token = await getToken({
                    template: "integration_firebase",
                });
                if (token && token.split(".").length === 3) {
                    await signInWithCustomToken(auth, token);
                    console.log("User signed in with Firebase");
                } else {
                    console.error(
                        "Invalid token format. Ensure the token is a valid JWT."
                    );
                    return;
                }

                const folderRef = ref(storage, "raw-photos/");
                const result = await listAll(folderRef);
                const urls = await Promise.all(
                    result.items.map(async (itemRef) => {
                        const url = await getDownloadURL(itemRef);
                        return url;
                    })
                );
                setImageUrls(urls);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setLoading(false);
            }
        };

        if (isLoaded && isSignedIn) {
            fetchImages();
        }
    }, [isLoaded, isSignedIn]);

    return (
        <>
            <GalleryHeader />
            <main>
                <div>
                    {/* {!isSignedIn ? (
                        <button onClick={signInWithClerk}>
                            Sign in with Clerk
                        </button>
                    ) : (
                        <p>You are signed in with Clerk.</p>
                    )} */}
                </div>
                <div>
                    {loading ? (
                        <p>Loading images...</p>
                    ) : imageUrls.length > 0 ? (
                        imageUrls.map((url, index) => (
                            <div key={index} style={{ marginBottom: "1rem" }}>
                                <Image
                                    src={url}
                                    alt={`Image ${index}`}
                                    layout="fixed"
                                    width={400} // Adjust as needed
                                    height={600} // Adjust as needed
                                />
                            </div>
                        ))
                    ) : (
                        <p>No images found.</p>
                    )}
                </div>
            </main>
        </>
    );
}
