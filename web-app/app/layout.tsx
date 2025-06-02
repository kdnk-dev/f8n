import "./globals.css";
import "@kdnk.dev/forms/form-style.css";

import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "k'dnk: f8n",
  description: "kdnk.dev",
};

export default async function RootLayout({
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
