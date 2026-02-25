import {z} from "zod";
import {useTranslations} from "next-intl";

export const createPatientFormSchema = (
  t: ReturnType<typeof useTranslations>,
) =>
  z.object({
    prefix: z.string().min(1, t("prefixRequired")),
    firstName: z.string().min(2, t("firstNameMin")),
    middleName: z.string().optional(),
    lastName: z.string().min(2, t("lastNameMin")),
    dateOfBirth: z
      .string()
      .min(1, t("dobRequired"))
      .refine((dateString) => {
        const date = new Date(dateString);
        const today = new Date();
        // Reset time part for today to compare just dates
        today.setHours(0, 0, 0, 0);
        return date <= today;
      }, t("dobFuture")),
    gender: z.string().min(1, t("genderRequired")),
    phoneNumber: z.string().regex(/^0\d{8,9}$/, t("phoneInvalid")),
    email: z.string().email(t("emailInvalid")),
    address: z.string().min(5, t("addressMin")),
    preferredLanguage: z.string().min(1, t("languageRequired")),
    nationality: z.string().min(1, t("nationalityRequired")),
    emergencyContactName: z.string().optional(),
    emergencyContactRelationship: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
    religion: z.string().optional(),
  });

// Since the shape is static, we can infer it accurately this way
export const baseSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string(),
  dateOfBirth: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  address: z.string(),
  preferredLanguage: z.string(),
  nationality: z.string(),
  emergencyContactName: z.string().optional(),
  emergencyContactRelationship: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  religion: z.string().optional(),
});

export type PatientFormData = z.infer<typeof baseSchema>;

export type PatientSyncData = PatientFormData & {
  sessionId: string;
  status: "inactive" | "active" | "submitted" | "disconnected";
};
