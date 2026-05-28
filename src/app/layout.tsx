import type { Metadata } from "next";
import { Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
import Sidebar from "@/components/layout/Sidebar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GAMA Design System V3.0",
  description:
    "GAMA DS V3 — design system tokenizado, com Liquid Glass, volumetric lighting e suporte a dark + light.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" data-theme="dark" className={`${poppins.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <div
              style={{
                display: "flex",
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
              }}
            >
              <Sidebar />
              <main
                style={{
                  flex: 1,
                  height: "100vh",
                  overflowY: "auto",
                  position: "relative",
                  background: "var(--color-bg)",
                }}
              >
                {children}
              </main>
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
