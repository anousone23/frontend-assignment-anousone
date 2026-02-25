"use client";

import {useLocale, useTranslations} from "next-intl";
import {usePathname, useRouter} from "@/i18n/routing";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Globe} from "lucide-react";
import {useTransition} from "react";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
  }

  return (
    <div className="relative">
      <Select
        defaultValue={locale}
        onValueChange={onSelectChange}
        disabled={isPending}
      >
        <SelectTrigger className="w-[140px] h-9 border-slate-200 dark:border-white/10 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm rounded-full">
          <Globe className="w-4 h-4 mr-2 text-brand-primary" />
          <SelectValue placeholder={t("switch")} />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="en">{t("en")}</SelectItem>
          <SelectItem value="th">{t("th")}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
