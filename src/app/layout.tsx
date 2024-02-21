import AppProvider from "@/config/appProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        style={{ backgroundColor: "#F8FAFB" }}
        suppressHydrationWarning={true}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
