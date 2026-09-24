/**
 * @vitest-environment node
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { likeSession } from "./like-session";

const originalWebhookUrl = process.env.FEEDBACK_WEBHOOK_URL;

describe("likeSession", () => {
  beforeEach(() => {
    process.env.FEEDBACK_WEBHOOK_URL = "https://webhook.example/test";
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    process.env.FEEDBACK_WEBHOOK_URL = originalWebhookUrl;
    vi.unstubAllGlobals();
  });

  it("posts sessionId and a generated likedAt to the webhook, returns success", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 200 }));

    const result = await likeSession({ sessionId: "opening-keynote" });

    expect(result).toEqual({ success: true, message: "Thanks!" });
    expect(fetch).toHaveBeenCalledWith(
      "https://webhook.example/test",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
    const body = JSON.parse(vi.mocked(fetch).mock.calls[0][1]?.body as string);
    expect(body.sessionId).toBe("opening-keynote");
    expect(typeof body.likedAt).toBe("string");
  });

  it("returns a validation error for an empty sessionId, without calling the webhook", async () => {
    const result = await likeSession({ sessionId: "" });

    expect(result.success).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns an error when the webhook responds with a non-2xx status", async () => {
    vi.mocked(fetch).mockResolvedValue(new Response(null, { status: 500 }));

    const result = await likeSession({ sessionId: "opening-keynote" });

    expect(result.success).toBe(false);
  });

  it("returns an error when the webhook URL is not configured", async () => {
    delete process.env.FEEDBACK_WEBHOOK_URL;

    const result = await likeSession({ sessionId: "opening-keynote" });

    expect(result.success).toBe(false);
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns an error when the fetch call itself throws", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("network down"));

    const result = await likeSession({ sessionId: "opening-keynote" });

    expect(result.success).toBe(false);
  });
});
