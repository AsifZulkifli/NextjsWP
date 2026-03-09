import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "NextjsWP",
  description: "Next.js WordPress project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
