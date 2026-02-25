import {NextRequest, NextResponse} from "next/server";
import {pusherServer} from "@/lib/pusher/server";

// A dedicated REST endpoint for page unload beacons.
// Server Actions (fetch) are often aborted by the browser during 'pagehide' or tab close.
// navigator.sendBeacon guarantees delivery, so we need a standard API route to receive it.
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    if (!data.sessionId) {
      return NextResponse.json({error: "Missing sessionId"}, {status: 400});
    }

    // Broadcast the disconnect event forcefully
    await pusherServer.trigger("patient-form", "status-change", {
      sessionId: data.sessionId,
      status: "disconnected",
    });

    return NextResponse.json({success: true});
  } catch (error) {
    console.error("Error in Pusher disconnect beacon route:", error);
    return NextResponse.json(
      {error: "Failed to broadcast disconnect"},
      {status: 500},
    );
  }
}
