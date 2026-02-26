"use server";

import {pusherServer} from "@/lib/pusher/server";
import {type PatientSyncData} from "@/types/schema";

export async function syncToPusherAction(
  data: Partial<PatientSyncData>,
  eventType: string,
) {
  try {
    await pusherServer.trigger("patient-form", eventType, data);
    return {success: true};
  } catch (error) {
    console.error("Error triggering pusher event in Server Action:", error);
    return {success: false, error: "Failed to sync to Pusher"};
  }
}
