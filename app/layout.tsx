import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "NeuroLearn — AI Learning Dashboard",
  description:
    "A modern AI-powered learning dashboard to track your courses, progress, and achievements.",
  keywords: ["AI", "learning", "dashboard", "machine learning", "courses"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
