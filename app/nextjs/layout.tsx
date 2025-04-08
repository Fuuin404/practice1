import { ReactNode } from "react"; // Import ReactNode
import NextJSBackgroundWrapper from "../components/NextJSBackgroundWrapper"; // New wrapper

export default function NextJSLayout({ children }: { children: ReactNode }) {
  // Type definition for children
  return (
    <div>
      <NextJSBackgroundWrapper />
      {children}
    </div>
  );
}
