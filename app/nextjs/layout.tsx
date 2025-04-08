"use client";

import Nav from "../components/Nav"; // Import Nav to keep it consistent
import NextJSBackgroundWrapper from "../components/NextJSBackgroundWrapper"; // New wrapper

export default function NextJSLayout({ children }) {
  return (
    <div>
      <NextJSBackgroundWrapper />
      <Nav /> {/* Add Nav here to maintain consistency */}
      <main className="p-4 relative z-10 bg-white/80">{children}</main>
      <footer className="p-4 bg-gray-200 text-center relative z-10">
        <p>© 2025 My First Next App</p>
      </footer>
    </div>
  );
}
