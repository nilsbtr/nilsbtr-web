import { faGamepad, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className=" bg-background w-full rounded-lg p-3 flex gap-6 items-center">
      <div className="rounded-lg hover:bg-accent hover:animate-pulse">
        <Link href="/" className="flex gap-3 items-center m-2">
          <Image
            src="/assets/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain rounded-full"
          />
          <p className="font-semibold text-lg tracking-wide">nilsbtr.de</p>
        </Link>
      </div>

      <ul className="flex items-center gap-6 tracking-wide">
        <li className="rounded-lg p-2 hover:bg-accent hover:scale-125 transition-all duration-300">
          <a href="/socials" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} className="text-content" />
            <p>Socials</p>
          </a>
        </li>
        <li className="rounded-lg p-2 hover:bg-accent hover:scale-125 transition-all duration-300">
          <a href="/gaming" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faGamepad} className="text-content" />
            <p>Gaming</p>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
