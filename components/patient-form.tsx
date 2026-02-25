"use client";

import {Button} from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import {FormInput} from "@/components/ui/form-input";
import {FormSelect} from "@/components/ui/form-select";
import {FormCombobox} from "@/components/ui/form-combobox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {usePatientForm} from "@/hooks/use-patient-form";
import {useTranslations, useLocale} from "next-intl";
import {nationalities} from "@/const/nationalities";

export function PatientForm() {
  const {form, isSubmitted, onSubmit} = usePatientForm();
  const t = useTranslations("PatientForm");
  const locale = useLocale();

  const nationalityOptions = nationalities.map((n) => ({
    value: n.value,
    label: locale === "th" ? n.th : n.en,
  }));

  if (isSubmitted) {
    return (
      <Card className="max-w-md w-full mx-auto my-auto z-10 text-center border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-900">
        <CardHeader>
          <CardTitle className="text-green-700 dark:text-green-300">
            {t("successTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-green-600 dark:text-green-400">
            {t("successDescription")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl  border-0 shadow-xl shadow-brand-primary/5 dark:bg-brand-secondary/90 backdrop-blur-sm z-10 my-auto">
      <CardHeader className="bg-white/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 px-6 py-6 sm:px-8">
        <CardTitle className="text-2xl text-brand-secondary dark:text-slate-100">
          {t("title")}
        </CardTitle>
        <CardDescription className="text-brand-secondary/70 dark:text-slate-400 text-base">
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Personal Details Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                control={form.control}
                name="prefix"
                label={t("prefix")}
                placeholder={t("prefixPlaceholder")}
                mandatory
                options={[
                  {label: t("prefixOptions.mr"), value: "Mr."},
                  {label: t("prefixOptions.mrs"), value: "Mrs."},
                  {label: t("prefixOptions.miss"), value: "Miss"},
                  {label: t("prefixOptions.master"), value: "Master"},
                  {
                    label: t("prefixOptions.youngMiss"),
                    value: "Miss (Child)",
                  },
                ]}
              />

              <FormInput
                control={form.control}
                name="firstName"
                label={t("firstName")}
                placeholder={t("firstNamePlaceholder")}
                mandatory
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="middleName"
                label={t("middleName")}
                placeholder={t("middleNamePlaceholder")}
              />
              <FormInput
                control={form.control}
                name="lastName"
                label={t("lastName")}
                placeholder={t("lastNamePlaceholder")}
                mandatory
              />
            </div>

            {/* Personal Details Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="dateOfBirth"
                label={t("dateOfBirth")}
                type="date"
                max={new Date().toISOString().split("T")[0]}
                mandatory
              />
              <FormSelect
                control={form.control}
                name="gender"
                label={t("gender")}
                placeholder={t("genderPlaceholder")}
                mandatory
                options={[
                  {label: t("genderOptions.male"), value: "Male"},
                  {label: t("genderOptions.female"), value: "Female"},
                  {label: t("genderOptions.other"), value: "Other"},
                  {
                    label: t("genderOptions.preferNotToSay"),
                    value: "Prefer not to say",
                  },
                ]}
              />
            </div>

            <Separator />

            {/* Contact Info Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                control={form.control}
                name="phoneNumber"
                label={t("phoneNumber")}
                placeholder={t("phoneNumberPlaceholder")}
                type="tel"
                mandatory
              />
              <FormInput
                control={form.control}
                name="email"
                label={t("email")}
                placeholder={t("emailPlaceholder")}
                type="email"
                mandatory
              />
            </div>

            <FormInput
              control={form.control}
              name="address"
              label={t("address")}
              placeholder={t("addressPlaceholder")}
              mandatory
            />

            <Separator />

            {/* Nationality, Language & Religion */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              <FormCombobox
                control={form.control}
                name="nationality"
                label={t("nationality")}
                placeholder={t("nationalityPlaceholder")}
                options={nationalityOptions}
                mandatory
              />

              <div className="md:flex md:items-center md:justify-center">
                <FormSelect
                  control={form.control}
                  name="preferredLanguage"
                  label={t("preferredLanguage")}
                  placeholder={t("preferredLanguagePlaceholder")}
                  mandatory
                  options={[
                    {
                      label: t("preferredLanguageOptions.english"),
                      value: "English",
                    },
                    {label: t("preferredLanguageOptions.thai"), value: "Thai"},
                  ]}
                />
              </div>

              <FormSelect
                control={form.control}
                name="religion"
                label={t("religion")}
                placeholder={t("religionPlaceholder")}
                options={[
                  {label: t("religionOptions.buddhism"), value: "Buddhism"},
                  {
                    label: t("religionOptions.christianity"),
                    value: "Christianity",
                  },
                  {label: t("religionOptions.islam"), value: "Islam"},
                  {label: t("religionOptions.hinduism"), value: "Hinduism"},
                  {label: t("religionOptions.other"), value: "Other"},
                ]}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg mt-4">
              <FormInput
                control={form.control}
                name="emergencyContactName"
                label={t("emergencyContactName")}
                placeholder={t("emergencyContactNamePlaceholder")}
              />
              <FormInput
                control={form.control}
                name="emergencyContactRelationship"
                label={t("emergencyContactRelationship")}
                placeholder={t("emergencyContactRelationshipPlaceholder")}
              />
              <FormInput
                control={form.control}
                name="emergencyContactPhone"
                label={t("emergencyContactPhone")}
                placeholder={t("emergencyContactPhonePlaceholder")}
              />
            </div>

            <Button
              type="submit"
              className="w-full text-base py-6 sm:py-7 mt-8 bg-brand-secondary hover:bg-brand-deep dark:bg-brand-primary dark:hover:bg-brand-primary/80 transition-colors duration-300 rounded-full"
            >
              {t("submit")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
