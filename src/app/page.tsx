import Link from "next/link";

export default function Home() {
    return (
        <main className="h-screen">
            <div className="flex justify-between p-3">
                <Link href="/">
                    <h1 className="text-xl font-bold">Lumino Studio</h1>
                </Link>
                <Link href="/gallery">Go to Gallery</Link>
            </div>
            <div className="flex flex-wrap flex-col justify-center h-full">
                <h2 className="text-8xl text-balance font-black">
                    Preserve your special moments with stunning, timeless
                    photography you&apos;ll love.
                </h2>
            </div>
        </main>
    );
}
