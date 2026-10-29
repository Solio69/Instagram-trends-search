import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Анализ трендов Instagram",
  description: "Поиск и анализ публикаций Instagram по нишам",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
