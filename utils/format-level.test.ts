import { describe, expect, it } from "vitest";

import { formatLevel } from "./format-level";

describe("formatLevel", () => {
  it.each([
    ["beginner", "Beginner"],
    ["intermediate", "Intermediate"],
    ["advanced", "Advanced"],
  ] as const)("capitalizes %s to %s", (level, expected) => {
    expect(formatLevel(level)).toBe(expected);
  });
});
