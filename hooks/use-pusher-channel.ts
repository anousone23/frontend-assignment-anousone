import {useEffect} from "react";
import {pusherClient} from "@/lib/pusher/client";

type EventsConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [event: string]: (data: any) => void;
};

export function usePusherChannel(channelName: string, events: EventsConfig) {
  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);

    Object.entries(events).forEach(([event, callback]) => {
      channel.bind(event, callback);
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(channelName);
    };
    // Note: We don't include events in the dependency array to avoid
    // constant re-subscribing if callbacks change on every render.
    // Callers should ensure they don't depend on stale closures,
    // or wrap their handlers in useCallback if needed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelName]);
}
