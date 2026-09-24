import { useCallback, useState } from "react";

import { likeSession } from "@/app/actions/like-session";

export type LikeSessionStatus = "idle" | "loading" | "success" | "error";

interface UseLikeSessionHandlerResult {
  status: LikeSessionStatus;
  like: (sessionId: string) => Promise<void>;
}

/** Owns the like-request lifecycle for a session. One hook, one concern. */
export function useLikeSessionHandler(): UseLikeSessionHandlerResult {
  const [status, setStatus] = useState<LikeSessionStatus>("idle");

  const like = useCallback(async (sessionId: string) => {
    setStatus("loading");

    try {
      const result = await likeSession({ sessionId });

      if (result.success) {
        setStatus("success");
      } else {
        console.error(
          "[useLikeSessionHandler] likeSession failed:",
          result.message,
        );
        setStatus("error");
      }
    } catch (error) {
      console.error("[useLikeSessionHandler] unexpected error:", error);
      setStatus("error");
    }
  }, []);

  return { status, like };
}
