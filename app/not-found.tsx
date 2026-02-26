import {routing} from "@/i18n/routing";
import enMessages from "../messages/en.json";
import {NextIntlClientProvider} from "next-intl";
import NotFoundPage from "./[locale]/not-found";
import {Geist, Geist_Mono, Anuphan} from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  variable: "--font-anuphan",
  subsets: ["latin", "thai"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anuphan.variable} font-anuphan antialiased bg-brand-lavender dark:bg-brand-deep`}
      >
        <NextIntlClientProvider
          locale={routing.defaultLocale}
          messages={enMessages}
        >
          <NotFoundPage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
