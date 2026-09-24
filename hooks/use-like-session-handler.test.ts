import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useLikeSessionHandler } from "./use-like-session-handler";

const { mockLikeSession } = vi.hoisted(() => ({
  mockLikeSession: vi.fn(),
}));

vi.mock("@/app/actions/like-session", () => ({
  likeSession: mockLikeSession,
}));

describe("useLikeSessionHandler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("goes idle -> loading -> success on a successful call", async () => {
    mockLikeSession.mockResolvedValue({ success: true, message: "Thanks!" });
    const { result } = renderHook(() => useLikeSessionHandler());

    expect(result.current.status).toBe("idle");

    act(() => {
      result.current.like("opening-keynote");
    });
    expect(result.current.status).toBe("loading");

    await waitFor(() => expect(result.current.status).toBe("success"));
    expect(mockLikeSession).toHaveBeenCalledWith({
      sessionId: "opening-keynote",
    });
  });

  it("goes to error when the action returns success: false", async () => {
    mockLikeSession.mockResolvedValue({
      success: false,
      message: "Something went wrong. Please try again.",
    });
    const { result } = renderHook(() => useLikeSessionHandler());

    act(() => {
      result.current.like("opening-keynote");
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
  });

  it("goes to error when the action throws unexpectedly", async () => {
    mockLikeSession.mockRejectedValue(new Error("network down"));
    const { result } = renderHook(() => useLikeSessionHandler());

    act(() => {
      result.current.like("opening-keynote");
    });

    await waitFor(() => expect(result.current.status).toBe("error"));
  });
});
