import {create} from "zustand";
import {type PatientSyncData} from "@/types/schema";

interface PatientStore {
  patients: Record<string, Partial<PatientSyncData>>;
  upsertPatient: (sessionId: string, data: Partial<PatientSyncData>) => void;
  removePatient: (sessionId: string) => void;
  clearAll: () => void;
}

export const usePatientStore = create<PatientStore>((set) => ({
  patients: {},
  upsertPatient: (sessionId, data) =>
    set((state) => ({
      patients: {
        ...state.patients,
        [sessionId]: {
          ...state.patients[sessionId],
          ...data,
        },
      },
    })),
  removePatient: (sessionId) =>
    set((state) => {
      const newPatients = {...state.patients};
      delete newPatients[sessionId];
      return {patients: newPatients};
    }),
  clearAll: () => set({patients: {}}),
}));
