import {useForm, useWatch} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useEffect, useCallback, useMemo, useRef} from "react";
import {
  createPatientFormSchema,
  type PatientFormData,
  type PatientSyncData,
} from "@/types/schema";
import {syncToPusherAction} from "@/actions/pusher";
import {useTranslations} from "next-intl";

export function usePatientForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isSubmittedRef = useRef(false);
  const [sessionId] = useState<string>(() => {
    // Lazy initialization purely on the client side
    if (typeof window === "undefined") return ""; // Will be replaced on client mount

    let currentSessionId = window.sessionStorage.getItem("patient-session-id");
    if (!currentSessionId) {
      currentSessionId = crypto.randomUUID();
      window.sessionStorage.setItem("patient-session-id", currentSessionId);
    }
    return currentSessionId;
  });
  const t = useTranslations("Zod");

  const schema = useMemo(() => createPatientFormSchema(t), [t]);

  const form = useForm<PatientFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      prefix: "",
      firstName: "",
      middleName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      phoneNumber: "",
      email: "",
      address: "",
      preferredLanguage: "",
      nationality: "",
      emergencyContactName: "",
      emergencyContactRelationship: "",
      emergencyContactPhone: "",
      religion: "",
    },
  });

  const watchAllFields = useWatch({control: form.control});

  const syncToPusher = useCallback(
    async (
      data: Omit<Partial<PatientSyncData>, "sessionId">,
      eventType: string,
    ) => {
      // Don't sync if we haven't mounted and loaded the cache yet
      if (!sessionId) return;

      try {
        const payload = {...data, sessionId} as Partial<PatientSyncData>;
        await syncToPusherAction(payload, eventType);
      } catch (error) {
        console.error("Failed to sync to Pusher Server Action", error);
      }
    },
    [sessionId],
  );

  const hydrateForm = useCallback(() => {
    // 1. Silent hydration: Pull from session storage only after the mount
    // to bypass React SSR hydration mismatches
    const savedData = window.sessionStorage.getItem("patient-form-draft");
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [form]);

  const syncActiveStatus = useCallback(() => {
    if (!isSubmitted) {
      // 2. Save form state visually to Pusher
      syncToPusher({...watchAllFields, status: "active"}, "form-update");
      // 3. Save purely locally to session storage so language switch is retained
      window.sessionStorage.setItem(
        "patient-form-draft",
        JSON.stringify(watchAllFields),
      );
    }
  }, [isSubmitted, syncToPusher, watchAllFields]);

  const syncInactiveStatus = useCallback(() => {
    if (!isSubmitted) {
      syncToPusher({status: "inactive"}, "status-change");
    }
  }, [isSubmitted, syncToPusher]);

  const syncDisconnectStatus = useCallback(() => {
    if (!isSubmittedRef.current && sessionId) {
      // Use navigator.sendBeacon to guarantee delivery even if the tab is closing
      // or navigating away in the background. Standard Server Action fetches
      // are dropped by the browser on page hide/unload.
      const blob = new Blob([JSON.stringify({sessionId})], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/pusher/disconnect", blob);
    }
  }, [sessionId]);

  useEffect(() => {
    hydrateForm();
  }, [hydrateForm]);

  useEffect(() => {
    const timeout = setTimeout(syncActiveStatus, 500);
    return () => clearTimeout(timeout);
  }, [syncActiveStatus]);

  useEffect(() => {
    const inactivityTimeout = setTimeout(syncInactiveStatus, 5000);
    return () => clearTimeout(inactivityTimeout);
  }, [syncInactiveStatus]);

  // Handle Tab Close / Unmount cleanup
  useEffect(() => {
    // pagehide is the most reliable event on modern browsers (especially mobile/background tabs)
    window.addEventListener("pagehide", syncDisconnectStatus);
    window.addEventListener("beforeunload", syncDisconnectStatus);

    return () => {
      window.removeEventListener("pagehide", syncDisconnectStatus);
      window.removeEventListener("beforeunload", syncDisconnectStatus);
      // Run on React Unmount as well (e.g., navigating away via Next.js Link)
      syncDisconnectStatus();
    };
  }, [syncDisconnectStatus]);

  async function onSubmit(data: PatientFormData) {
    isSubmittedRef.current = true;
    setIsSubmitted(true);
    // 4. Wipe sensitive medical data from local browser storage when done
    window.sessionStorage.removeItem("patient-form-draft");
    // Note: We DO NOT remove the patient-session-id here.
    // If we drop it, the "disconnect" unmount event won't have an ID,
    // or the Staff Dashboard might lose track of the finalized card.
    await syncToPusher({...data, status: "submitted"}, "form-submit");
  }

  return {form, isSubmitted, onSubmit};
}
