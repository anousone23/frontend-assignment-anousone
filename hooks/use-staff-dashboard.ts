import {usePusherChannel} from "@/hooks/use-pusher-channel";
import {type PatientSyncData} from "@/types/schema";
import {usePatientStore} from "@/stores/use-patient-store";
import {useCallback} from "react";

export function useStaffDashboard() {
  const {
    patients: activePatients,
    upsertPatient,
    removePatient,
  } = usePatientStore();

  const handleFormUpdate = useCallback(
    (data: Partial<PatientSyncData>) => {
      if (!data.sessionId) return;
      upsertPatient(data.sessionId, {...data, status: "active"});
    },
    [upsertPatient],
  );

  const handleStatusChange = useCallback(
    (data: Partial<PatientSyncData>) => {
      if (!data.sessionId) return;

      const existingPatient = activePatients[data.sessionId];

      if (data.status === "disconnected") {
        //  only want to delete "active" or "inactive" patients who gave up halfway.
        if (existingPatient?.status !== "submitted") {
          removePatient(data.sessionId);
        }
        return;
      }

      upsertPatient(data.sessionId, {status: data.status});
    },
    [activePatients, removePatient, upsertPatient],
  );

  const handleFormSubmit = useCallback(
    (data: Partial<PatientSyncData>) => {
      if (!data.sessionId) return;
      upsertPatient(data.sessionId, {...data, status: "submitted"});
    },
    [upsertPatient],
  );

  usePusherChannel("patient-form", {
    "form-update": handleFormUpdate,
    "status-change": handleStatusChange,
    "form-submit": handleFormSubmit,
  });

  return {activePatients};
}
