"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import GradientBackground from "@/components/GradientBackground";
import "@/styles/animated-gradient.css"; // Adjust the path as necessary

export default function Home() {
    return (
        <main className="">
            <section className="h-[75vh] md:max-w-[1000px] relative justify-center z-10 flex flex-col p-5 md:p-16 gap-8 lg:pl-[10%]">
                <h1 className="ppneuemontreal text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-black text-balance">
                    Effortless File Management, Anytime, Anywhere
                </h1>
                <p className="text-lg md:text-2xl">
                    Streamline your file operations with our intuitive platform.
                    Connect to your account to easily upload, rename, and delete
                    files with just a few clicks. Designed for simplicity and
                    ease, our tool ensures that managing your documents is quick
                    and hassle-free, so you can focus on what matters most.
                </p>
                <Button className="w-fit">
                    <Link href="/dashboard">Access File Manager</Link>
                </Button>
            </section>
            <GradientBackground />
        </main>
    );
}
