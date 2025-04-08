"use client";

import NextJSBackgroundWrapper from "../components/NextJSBackgroundWrapper"; // New wrapper

export default function NextJSLayout({ children }) {
  return (
    <div>
      <NextJSBackgroundWrapper />
      <main className="p-4 relative z-10 bg-white/80">{children}</main>
    </div>
  );
}
