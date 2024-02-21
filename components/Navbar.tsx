import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-background w-full rounded-lg p-3">
            <Link href="/" className="flex gap-2 m-2">
                <Image src="/assets/logo.png" alt="Logo" width={30} height={30} className="object-contain rounded-full" />
                <p className="text-content">nilsbtr.de</p>
            </Link>
        </nav>
    )
}

export default Navbar;