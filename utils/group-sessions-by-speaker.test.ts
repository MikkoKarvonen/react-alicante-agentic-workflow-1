import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function makeSession(overrides: Partial<Session>): Session {
  return {
    id: "session",
    title: "Session",
    speaker: "Speaker",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    description: "",
    startTime: "09:00",
    durationMinutes: 45,
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("groups each speaker's sessions together, sorted by speaker name", () => {
    const sessions = [
      makeSession({ id: "s1", speaker: "Zara Blue", title: "Talk A" }),
      makeSession({ id: "s2", speaker: "Marta Fernandez", title: "Talk B" }),
      makeSession({ id: "s3", speaker: "Marta Fernandez", title: "Talk C" }),
    ];

    const result = groupSessionsBySpeaker(sessions);

    expect(result.map((entry) => entry.speaker)).toEqual([
      "Marta Fernandez",
      "Zara Blue",
    ]);
    expect(result[0].sessions.map((session) => session.title)).toEqual([
      "Talk B",
      "Talk C",
    ]);
  });

  it("preserves the input order of each speaker's own sessions", () => {
    const sessions = [
      makeSession({ id: "s1", speaker: "Marta Fernandez", startTime: "09:00" }),
      makeSession({ id: "s2", speaker: "Marta Fernandez", startTime: "14:00" }),
    ];

    const result = groupSessionsBySpeaker(sessions);

    expect(result[0].sessions.map((session) => session.id)).toEqual([
      "s1",
      "s2",
    ]);
  });

  it('excludes the closing panel\'s "Full speaker lineup" placeholder', () => {
    const sessions = [
      makeSession({ id: "s1", speaker: "Marta Fernandez" }),
      makeSession({ id: "closing-panel", speaker: "Full speaker lineup" }),
    ];

    const result = groupSessionsBySpeaker(sessions);

    expect(result).toHaveLength(1);
    expect(result[0].speaker).toBe("Marta Fernandez");
  });

  it("returns an empty array for no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
