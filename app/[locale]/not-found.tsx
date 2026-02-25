"use client";

import {useTranslations} from "next-intl";
import {Link} from "@/i18n/routing";
import {Button} from "@/components/ui/button";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-brand-lavender dark:bg-brand-deep transition-colors duration-300 text-center">
      <h1 className="text-6xl font-bold text-brand-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-brand-secondary dark:text-slate-50 mb-6">
        {t("title")}
      </h2>
      <p className="text-brand-secondary/70 dark:text-slate-400 mb-8 max-w-md">
        {t("description")}
      </p>
      <Link href="/">
        <Button
          size="lg"
          className="rounded-full shadow-md shadow-brand-primary/20"
        >
          {t("backToHome")}
        </Button>
      </Link>
    </main>
  );
}
