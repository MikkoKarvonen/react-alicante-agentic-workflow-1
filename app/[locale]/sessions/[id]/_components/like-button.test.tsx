import { render, screen, userEvent } from "@/tests/utils/render";
import { describe, expect, it, vi } from "vitest";

import { LikeButton } from "./like-button";

describe("LikeButton", () => {
  it("shows the like label and calls onLike when clicked", async () => {
    const onLike = vi.fn();
    render(<LikeButton status="idle" onLike={onLike} />);

    const button = screen.getByRole("button", { name: "👍 Like" });
    await userEvent.click(button);

    expect(onLike).toHaveBeenCalledTimes(1);
  });

  it("disables the button while loading", () => {
    render(<LikeButton status="loading" onLike={vi.fn()} />);

    expect(screen.getByRole("button", { name: "👍 Like" })).toBeDisabled();
  });

  it("shows Thanks! and stays disabled on success", () => {
    render(<LikeButton status="success" onLike={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Thanks!" })).toBeDisabled();
  });

  it("shows an error message and stays clickable to retry", () => {
    render(<LikeButton status="error" onLike={vi.fn()} />);

    expect(
      screen.getByRole("button", { name: "Something went wrong" }),
    ).toBeEnabled();
  });
});
