import {Link} from "@/i18n/routing";
import {Button} from "@/components/ui/button";
import {useTranslations} from "next-intl";
import {LanguageSwitcher} from "@/components/language-switcher";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-brand-lavender dark:bg-brand-deep transition-colors duration-300">
      <div
        className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 80%)",
        }}
      ></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent dark:from-brand-primary/10 pointer-events-none"></div>

      <div className="w-full max-w-3xl mx-auto relative z-10 flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <div className="w-full text-center space-y-8 max-w-3xl mx-auto relative z-10 bg-white/60 dark:bg-brand-secondary/60 backdrop-blur-md px-6 py-10 sm:p-12 rounded-3xl shadow-xl border border-white/20 dark:border-white/5">
        <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-4">
          Agnos Health Smart Systems
        </div>

        <h1 className="text-5xl font-bold tracking-tight text-brand-secondary dark:text-slate-50 sm:text-7xl leading-tight">
          {t("title")}
        </h1>

        <p className="text-xl leading-8 text-brand-secondary/80 dark:text-slate-300">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/patient/register" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold shadow-lg shadow-brand-primary/30 hover:shadow-brand-primary/50 transition-shadow"
            >
              {t("openPatient")}
            </Button>
          </Link>
          <Link href="/staff/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base font-semibold border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/5 dark:hover:bg-brand-primary/20 dark:text-brand-lavender"
            >
              {t("openStaff")}
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
