import type { Metadata } from "next";
import "./globals.css";
import { WrapperProvider } from "@/components/WrapperProvider";
import DevToolsWrapper from "@/components/DevToolsWrapper";

export const metadata: Metadata = {
  title: "SMA POC Wrapper",
  description: "Wrapper application for SMA proof-of-concept submodules",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <WrapperProvider>
          {children}
          <DevToolsWrapper />
        </WrapperProvider>
      </body>
    </html>
  );
}
