import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZK File Vault",
  description: "Zero-knowledge encrypted file storage",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
