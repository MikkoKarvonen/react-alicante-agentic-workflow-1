import { render, screen, userEvent } from "@/tests/utils/render";
import { describe, expect, it, vi } from "vitest";

import { LikeButtonArea } from "./like-button-area";

const { mockUseLikeSessionHandler } = vi.hoisted(() => ({
  mockUseLikeSessionHandler: vi.fn(),
}));

vi.mock("@/hooks/use-like-session-handler", () => ({
  useLikeSessionHandler: mockUseLikeSessionHandler,
}));

describe("LikeButtonArea", () => {
  it("calls the hook's like with the sessionId when clicked", async () => {
    const like = vi.fn();
    mockUseLikeSessionHandler.mockReturnValue({ status: "idle", like });

    render(<LikeButtonArea sessionId="opening-keynote" />);
    await userEvent.click(screen.getByRole("button", { name: "👍 Like" }));

    expect(like).toHaveBeenCalledWith("opening-keynote");
  });

  it("passes the hook's status through to the button", () => {
    mockUseLikeSessionHandler.mockReturnValue({
      status: "success",
      like: vi.fn(),
    });

    render(<LikeButtonArea sessionId="opening-keynote" />);

    expect(screen.getByRole("button", { name: "Thanks!" })).toBeDisabled();
  });
});
