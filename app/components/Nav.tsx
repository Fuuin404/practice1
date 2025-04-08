"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/posts", label: "Posts" },
    { href: "/videos", label: "Videos" },
    { href: "/p5js", label: "P5.js" },
    { href: "/high-spirits", label: "High Spirits" },
    { href: "/japan", label: "Japan" },
    { href: "/design", label: "Design" },
    { href: "/nextjs", label: "Next.js" },
  ];

  return (
    <nav className="p-4 bg-gray-100">
      <ul className="flex space-x-4">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`${
                pathname === href ? "text-red-800 font-bold" : "text-red-500"
              } hover:underline`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
