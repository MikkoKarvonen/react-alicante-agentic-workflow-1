"use server";

import {
  actionError,
  actionSuccess,
  type ActionResult,
} from "@/utils/action-result";
import { z } from "zod";

const schema = z.object({
  sessionId: z.string().min(1),
});

type Input = z.infer<typeof schema>;

/**
 * Posts a like signal to FEEDBACK_WEBHOOK_URL — a server-only secret (no
 * NEXT_PUBLIC_ prefix, see .env.example). `likedAt` is generated here, never
 * taken from the client, so a caller can't backdate a like.
 *
 * No rate limiting: this project has no rate limiter yet. A public
 * unauthenticated action can be called in a loop — acceptable for a
 * low-stakes feedback signal with no database write, flagged at the
 * feature-builder breakpoint rather than silently shipped or silently built.
 */
export async function likeSession(data: Input): Promise<ActionResult> {
  try {
    const { sessionId } = schema.parse(data);

    const webhookUrl = process.env.FEEDBACK_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error("[likeSession] FEEDBACK_WEBHOOK_URL is not set");
      return actionError("Something went wrong. Please try again.");
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        likedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error(`[likeSession] webhook responded ${response.status}`);
      return actionError("Something went wrong. Please try again.");
    }

    return actionSuccess("Thanks!");
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.warn("[likeSession] rejected invalid input:", error.issues);
      return actionError("Something went wrong. Please try again.");
    }
    console.error("[likeSession] unexpected error:", error);
    return actionError("Something went wrong. Please try again.");
  }
}
