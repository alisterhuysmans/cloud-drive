import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "../styles/animated-gradient.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "react-hot-toast";
import Header from "@/components/Header";

const ppneuemontreal = localFont({
    src: [
        {
            path: "../../public/fonts/ppneuemontreal-book-webfont.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-book-webfont.woff",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-bold-webfont.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-bold-webfont.woff",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-italic-webfont.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../public/fonts/ppneuemontreal-italic-webfont.woff",
            weight: "400",
            style: "italic",
        },
        {
            path: "../../public/fonts/ppneuemontreal-medium-webfont.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-medium-webfont.woff",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-semibolditalic-webfont.woff2",
            weight: "600",
            style: "italic",
        },
        {
            path: "../../public/fonts/ppneuemontreal-semibolditalic-webfont.woff",
            weight: "600",
            style: "italic",
        },
        {
            path: "../../public/fonts/ppneuemontreal-thin-webfont.woff2",
            weight: "100",
            style: "normal",
        },
        {
            path: "../../public/fonts/ppneuemontreal-thin-webfont.woff",
            weight: "100",
            style: "normal",
        },
    ],
});

export const metadata: Metadata = {
    title: "Cloud Drive",
    description: "Seamlessly Access and Manage Your Files Anywhere.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`relative ${ppneuemontreal.className}`}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Header />
                        {children}
                        <Toaster
                            position="bottom-center"
                            reverseOrder={false}
                        />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
