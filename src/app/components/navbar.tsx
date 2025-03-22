import Link from "next/link";
import Image from "next/image";
import { inter } from "../ui/fonts";

export default function Navbar() {
  return (
    <nav
      className={`w-screen px-6 h-[80px] bg-[#2980B9] text-white ${inter.variable}`}
    >
      <div className="flex justify-between h-full max-w-[1200px] m-auto">
        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/" className="text-2xl">
              Handcrafted Haven
            </Link>
          </li>
          <li>
            <Link href="/">Shop</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/" className="flex gap-1">
              <Image
                src="/search.svg"
                width={18}
                height={18}
                alt="Search button"
              />{" "}
              Search
            </Link>
          </li>
        </ul>

        <ul className="flex gap-6 items-center">
          <li>
            <Link href="/" className="flex gap-1">
              <Image
                src="/bag.svg"
                width={18}
                height={18}
                alt="Search button"
              />{" "}
              3
            </Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
