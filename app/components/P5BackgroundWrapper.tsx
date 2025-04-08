"use client";

import dynamic from "next/dynamic";

// Dynamically import P5Background with SSR disabled
const P5Background = dynamic(() => import("./P5Background"), {
  ssr: false,
});

export default function P5BackgroundWrapper() {
  return <P5Background />;
}
