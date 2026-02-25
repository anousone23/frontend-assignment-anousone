import {LanguageSwitcher} from "@/components/language-switcher";
import {PatientForm} from "@/components/patient-form";

export default function PatientFormPage() {
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
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-primary/5 rounded-full blur-3xl mix-blend-multiply pointer-events-none"></div>
      <div className="w-full max-w-2xl relative z-10 flex flex-col">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <PatientForm />
      </div>
    </div>
  );
}
