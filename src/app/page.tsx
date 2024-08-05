import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main>
            <div>Hello</div>
            <Link href="/gallery">Go to Gallery</Link>
        </main>
    );
}
