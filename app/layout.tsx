import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AutoRent Pro — Avtomobil Ijarasi Platformasi",
  description: "O'zbekistonda zamonaviy avtomobillar ijarasi va avtopark boshqaruvi tizimi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
