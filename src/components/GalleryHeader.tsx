import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import styles from "../styles/GalleryHeader.module.scss";
import Link from "next/link";

function GalleryHeader() {
    return (
        <header>
            <Link href={"/"}>Home</Link>
            <div>GalleryHeader</div>
            <UserButton />
            <SignedOut>
                <SignInButton fallbackRedirectUrl={"/gallery"} mode="modal" />
            </SignedOut>
        </header>
    );
}

export default GalleryHeader;
