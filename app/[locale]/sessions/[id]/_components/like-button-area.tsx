"use client";

import { useLikeSessionHandler } from "@/hooks/use-like-session-handler";

import { LikeButton } from "./like-button";

interface LikeButtonAreaProps {
  sessionId: string;
}

/** Wires LikeButton to the like-request lifecycle — no business logic of its own. */
export function LikeButtonArea({ sessionId }: LikeButtonAreaProps) {
  const { status, like } = useLikeSessionHandler();

  return <LikeButton status={status} onLike={() => like(sessionId)} />;
}
