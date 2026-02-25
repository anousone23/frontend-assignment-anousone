import {StaffDashboard} from "@/components/staff-dashboard";
import {LanguageSwitcher} from "@/components/language-switcher";

export default function StaffViewPage() {
  return (
    <div className="min-h-screen p-4 pt-16 md:p-8 md:pt-24 bg-brand-lavender dark:bg-brand-deep transition-colors duration-300 flex justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-grid-pattern pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 80%)",
        }}
      ></div>
      <div className="absolute top-[0%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="w-full max-w-4xl space-y-6 relative z-10">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <StaffDashboard />
      </div>
    </div>
  );
}
