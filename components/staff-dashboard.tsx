"use client";

import {useStaffDashboard} from "@/hooks/use-staff-dashboard";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {useTranslations} from "next-intl";
import {useStaffTranslations} from "@/hooks/use-staff-translations";
import {PatientCard} from "@/components/ui/patient-card";

export function StaffDashboard() {
  const {activePatients} = useStaffDashboard();
  const patientsList = Object.values(activePatients);

  const livePatients = patientsList.filter((p) => p.status !== "submitted");
  const submittedPatients = patientsList.filter(
    (p) => p.status === "submitted",
  );

  const t = useTranslations("StaffDashboard");
  const {formatGender, formatNationality} = useStaffTranslations();

  return (
    <>
      {/* Header and Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-secondary dark:text-slate-50">
            Staff Monitoring Dashboard
          </h1>
        </div>
      </div>

      <Tabs
        defaultValue="active"
        className="w-full space-y-6 z-10 relative mb-8"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 rounded-xl bg-white/50 dark:bg-slate-900/50 p-1 pb-10">
          <TabsTrigger
            value="active"
            className="rounded-lg py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm font-medium"
          >
            Currently Filling ({livePatients.length})
          </TabsTrigger>
          <TabsTrigger
            value="submitted"
            className="rounded-lg py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm font-medium"
          >
            Submitted ({submittedPatients.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-0 border-0 p-0 outline-none">
          {livePatients.length === 0 ? (
            <Card className="shadow-xl shadow-brand-primary/5 border-0 bg-white/60 dark:bg-brand-secondary/90 backdrop-blur-sm overflow-hidden z-10 relative">
              <CardContent className="p-6 bg-white/50 dark:bg-white/5">
                <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                  <svg
                    className="w-12 h-12 mb-4 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {t("waiting")}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6 z-10 relative">
              {livePatients.map((patientData, index) => (
                <PatientCard
                  key={patientData.sessionId || index}
                  patientData={patientData}
                  index={index}
                  t={t}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent
          value="submitted"
          className="mt-0 border-0 p-0 outline-none"
        >
          {submittedPatients.length === 0 ? (
            <Card className="shadow-xl shadow-brand-primary/5 border-0 bg-white/60 dark:bg-brand-secondary/90 backdrop-blur-sm overflow-hidden z-10 relative">
              <CardContent className="p-6 bg-white/50 dark:bg-white/5">
                <div className="text-center py-12 text-slate-500 flex flex-col items-center">
                  <span className="text-slate-400">
                    No submitted forms yet.
                  </span>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-xl shadow-brand-primary/5 border-0 bg-white/60 dark:bg-brand-secondary/90 backdrop-blur-sm overflow-hidden z-10 relative">
              <CardHeader className="bg-white/50 dark:bg-white/5 border-b border-slate-100 dark:border-white/10 px-6 py-4">
                <CardTitle className="text-xl text-brand-secondary dark:text-slate-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                  {t("status.submitted")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-slate-50/50 dark:bg-slate-900/50">
                    <TableRow>
                      <TableHead className="px-6 py-4">
                        {t("firstName")}
                      </TableHead>
                      <TableHead className="py-4">{t("lastName")}</TableHead>
                      <TableHead className="py-4">{t("gender")}</TableHead>
                      <TableHead className="py-4">{t("phone")}</TableHead>
                      <TableHead className="py-4">{t("email")}</TableHead>
                      <TableHead className="px-6 py-4 text-right">
                        {t("nationality")}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submittedPatients.map((patient) => (
                      <TableRow
                        key={patient.sessionId}
                        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <TableCell className="px-6 py-4 font-medium">
                          {patient.firstName}
                        </TableCell>
                        <TableCell className="py-4">
                          {patient.lastName}
                        </TableCell>
                        <TableCell className="py-4">
                          {formatGender(patient.gender)}
                        </TableCell>
                        <TableCell className="py-4 text-slate-500">
                          {patient.phoneNumber}
                        </TableCell>
                        <TableCell className="py-4 text-slate-500">
                          {patient.email}
                        </TableCell>
                        <TableCell className="px-6 py-4 text-right">
                          <Badge variant="outline" className="font-normal">
                            {formatNationality(patient.nationality)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
