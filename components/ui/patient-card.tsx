import {useState} from "react";
import {ChevronDown, ChevronUp} from "lucide-react";
import {type PatientSyncData} from "@/types/schema";
import {useStaffTranslations} from "@/hooks/use-staff-translations";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {DataField} from "@/components/ui/data-field";

export function PatientCard({
  patientData,
  index,
  t,
}: {
  patientData: Partial<PatientSyncData>;
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    formatPrefix,
    formatGender,
    formatLanguage,
    formatReligion,
    formatNationality,
    formatDate,
  } = useStaffTranslations();

  return (
    <Card className="shadow-xl shadow-brand-primary/5 border-0 bg-white/60 dark:bg-brand-secondary/90 backdrop-blur-sm overflow-hidden flex flex-col h-full">
      <CardHeader
        className="bg-white/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 px-6 py-6 sm:px-8 flex flex-row items-center justify-between cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <CardTitle className="text-lg text-brand-secondary dark:text-slate-100">
            Patient {index + 1}
          </CardTitle>
          <CardDescription className="text-brand-secondary/70 dark:text-slate-400 text-base">
            Session: {patientData.sessionId?.slice(0, 8)}...
          </CardDescription>
        </div>
        <div className="flex items-center gap-4">
          <div>
            {patientData.status === "inactive" && (
              <Badge
                variant="secondary"
                className="text-xs px-2 py-0.5 w-[115px] justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5 inline-block"></span>
                {t("status.inactive")}
              </Badge>
            )}
            {patientData.status === "active" && (
              <Badge
                variant="default"
                className="text-xs px-2 py-0.5 bg-brand-primary text-white w-[115px] justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1.5 inline-block"></span>
                {t("status.active")}
              </Badge>
            )}
            {patientData.status === "submitted" && (
              <Badge
                variant="default"
                className="text-xs px-2 py-0.5 bg-green-500 w-[115px] justify-center"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white mr-1.5 inline-block"></span>
                {t("status.submitted")}
              </Badge>
            )}
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none">
            {isExpanded ? (
              <ChevronUp className="h-6 w-6" />
            ) : (
              <ChevronDown className="h-6 w-6" />
            )}
          </button>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-6 bg-white/50 dark:bg-white/5 grow animate-in slide-in-from-top-2 fade-in duration-200">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                {t("personalInfo")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
                <DataField
                  label={t("prefix")}
                  value={formatPrefix(patientData.prefix)}
                />
                <DataField
                  label={t("firstName")}
                  value={patientData.firstName}
                />
                <DataField
                  label={t("middleName")}
                  value={patientData.middleName}
                />
                <DataField label={t("lastName")} value={patientData.lastName} />
                <DataField
                  label={t("dob")}
                  value={formatDate(patientData.dateOfBirth)}
                />
                <DataField
                  label={t("gender")}
                  value={formatGender(patientData.gender)}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                {t("contactInfo")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <DataField label={t("phone")} value={patientData.phoneNumber} />
                <DataField label={t("email")} value={patientData.email} />
                <DataField
                  label={t("address")}
                  value={patientData.address}
                  className="md:col-span-2"
                  maxLength={100}
                />
              </div>
            </div>

            {/* Background & Emergency */}
            <div>
              <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                {t("additionalDetails")}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                <DataField
                  label={t("nationality")}
                  value={formatNationality(patientData.nationality)}
                />
                <DataField
                  label={t("preferredLanguage")}
                  value={formatLanguage(patientData.preferredLanguage)}
                />
                <DataField
                  label={t("religion")}
                  value={formatReligion(patientData.religion)}
                />
              </div>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md border mt-6">
                <h4 className="font-semibold mb-3 pb-2">
                  {t("emergencyContact")}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <DataField
                    label={t("emergencyContactName")}
                    value={patientData.emergencyContactName}
                  />
                  <DataField
                    label={t("emergencyContactRelationship")}
                    value={patientData.emergencyContactRelationship}
                  />
                  <DataField
                    label={t("emergencyContactPhone")}
                    value={patientData.emergencyContactPhone}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
