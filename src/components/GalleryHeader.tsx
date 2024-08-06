import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

function GalleryHeader() {
    return (
        <header className="flex justify-between align-middle p-3 gap-10">
            <Link href={"/"}>Home</Link>
            <div>Galerie privée</div>
            <div className="flex align-middle">
                <div className="mx-5">
                    <ThemeToggler />
                </div>
                <div>
                    <UserButton />
                    <SignedOut>
                        <SignInButton
                            fallbackRedirectUrl={"/gallery"}
                            mode="modal"
                        />
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}

export default GalleryHeader;
