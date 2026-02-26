import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {type PatientSyncData} from "@/types/schema";
import {useStaffTranslations} from "@/hooks/use-staff-translations";

interface SubmittedPatientsTableProps {
  patients: Partial<PatientSyncData>[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
}

export function SubmittedPatientsTable({
  patients,
  t,
}: SubmittedPatientsTableProps) {
  const {
    formatPrefix,
    formatGender,
    formatNationality,
    formatDate,
    formatLanguage,
    formatReligion,
  } = useStaffTranslations();

  return (
    <Table>
      <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
        <TableRow>
          <TableHead className="px-6 py-4 whitespace-nowrap">
            {t("prefix")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("firstName")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("middleName")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("lastName")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">{t("dob")}</TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("gender")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">{t("phone")}</TableHead>
          <TableHead className="py-4 whitespace-nowrap">{t("email")}</TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("address")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("preferredLanguage")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap text-center">
            {t("nationality")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("religion")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("emergencyContactName")}
          </TableHead>
          <TableHead className="py-4 whitespace-nowrap">
            {t("emergencyContactRelationship")}
          </TableHead>
          <TableHead className="px-6 py-4 text-right whitespace-nowrap">
            {t("emergencyContactPhone")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow
            key={patient.sessionId}
            className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <TableCell className="px-6 py-4 whitespace-nowrap">
              {formatPrefix(patient.prefix)}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.firstName}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.middleName || "-"}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.lastName}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {formatDate(patient.dateOfBirth)}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {formatGender(patient.gender)}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.phoneNumber}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.email}
            </TableCell>
            <TableCell
              className="py-4 max-w-[200px] truncate"
              title={patient.address}
            >
              {patient.address}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {formatLanguage(patient.preferredLanguage)}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap text-center">
              <Badge variant="outline" className="font-normal">
                {formatNationality(patient.nationality)}
              </Badge>
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {formatReligion(patient.religion) || "-"}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.emergencyContactName || "-"}
            </TableCell>
            <TableCell className="py-4 whitespace-nowrap">
              {patient.emergencyContactRelationship || "-"}
            </TableCell>
            <TableCell className="px-6 py-4 text-right whitespace-nowrap">
              {patient.emergencyContactPhone || "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
