"use client";

import dynamic from "next/dynamic";

const NextJSBackground = dynamic(() => import("./NextJSBackground"), {
  ssr: false,
});

export default function NextJSBackgroundWrapper() {
  return <NextJSBackground />;
}
