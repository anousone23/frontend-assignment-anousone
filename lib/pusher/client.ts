import PusherClient from "pusher-js";

// Client-side Pusher initialization
// Provide fallbacks to prevent errors during Next.js static build phase
export const pusherClient = new PusherClient(
  process.env.NEXT_PUBLIC_PUSHER_KEY || "fallback_key",
  {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || "fallback_cluster",
  },
);
