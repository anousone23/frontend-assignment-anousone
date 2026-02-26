import {useTranslations, useLocale} from "next-intl";
import {nationalities} from "@/const/nationalities";

export function useStaffTranslations() {
  const tForm = useTranslations("PatientForm");
  const locale = useLocale();

  const formatPrefix = (val?: string) => {
    if (!val) return val;
    const map: Record<string, string> = {
      "Mr.": "mr",
      "Mrs.": "mrs",
      Miss: "miss",
      Master: "master",
      "Miss (Child)": "youngMiss",
    };
    return map[val] ? tForm(`prefixOptions.${map[val]}`) : val;
  };

  const formatGender = (val?: string) => {
    if (!val) return val;
    const map: Record<string, string> = {
      Male: "male",
      Female: "female",
      Other: "other",
      "Prefer not to say": "preferNotToSay",
    };
    return map[val] ? tForm(`genderOptions.${map[val]}`) : val;
  };

  const formatLanguage = (val?: string) => {
    if (!val) return val;
    const map: Record<string, string> = {English: "english", Thai: "thai"};
    return map[val] ? tForm(`preferredLanguageOptions.${map[val]}`) : val;
  };

  const formatReligion = (val?: string) => {
    if (!val) return val;
    const map: Record<string, string> = {
      Buddhism: "buddhism",
      Christianity: "christianity",
      Islam: "islam",
      Hinduism: "hinduism",
      Other: "other",
    };
    return map[val] ? tForm(`religionOptions.${map[val]}`) : val;
  };

  const formatNationality = (val?: string) => {
    if (!val) return val;
    const nat = nationalities.find((n) => n.value === val);
    if (!nat) return val;
    return locale === "th" ? nat.th : nat.en;
  };

  return {
    formatPrefix,
    formatGender,
    formatLanguage,
    formatReligion,
    formatNationality,
  };
}
