import { SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
    return (
        <header className="relative flex justify-between items-center px-4 py-3 gap-5 z-20">
            <Link href={"/"} className="text-lg flex-1 font-semibold">
                Cloud Drive
            </Link>
            <ThemeToggler />
            <UserButton />
            <SignedOut>
                <div className="font-medium">
                    <SignInButton
                        fallbackRedirectUrl={"/dashboard"}
                        mode="modal"
                    />
                </div>
            </SignedOut>
        </header>
    );
}

export default Header;
