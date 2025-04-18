import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import P5BackgroundWrapper from "./components/P5BackgroundWrapper";
import { ReactNode } from "react"; // Import ReactNode

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My First Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Type definition for children
  return (
    <html lang="en">
      <body className={inter.className}>
        <P5BackgroundWrapper />
        <Nav />
        <main className="p-4 relative z-10 bg-white/80">{children}</main>
        <footer className="p-4 bg-gray-200 text-center relative z-10">
          <p>© 2025 My Next App</p>
        </footer>
      </body>
    </html>
  );
}
