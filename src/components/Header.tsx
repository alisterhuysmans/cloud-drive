import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";
import { CloudUpload } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
    return (
        <header className="relative flex justify-between items-center px-5 py-3 gap-2 z-20">
            <div className="flex-1">
                <Link href={"/"} className="w-fit text-lg font-semibold">
                    Cloud Drive
                </Link>
            </div>
            <SignedIn>
                <Button variant="link" className="px-0">
                    <Link href={"/dashboard"}>
                        <CloudUpload strokeWidth={1.5} />
                    </Link>
                </Button>
            </SignedIn>
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
