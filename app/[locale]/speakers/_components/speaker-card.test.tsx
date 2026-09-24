import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { describe, expect, it } from "vitest";

import { SpeakerCard } from "./speaker-card";

function makeSession(overrides: Partial<Session>): Session {
  return {
    id: "session",
    title: "Session",
    speaker: "Marta Fernandez",
    track: "React",
    room: "Main Hall",
    description: "",
    startTime: "09:00",
    durationMinutes: 45,
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    const speakerSessions: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [
        makeSession({
          id: "opening-keynote",
          title: "Opening Keynote",
          startTime: "09:00",
        }),
        makeSession({
          id: "closing-thoughts",
          title: "Closing Thoughts",
          startTime: "16:00",
        }),
      ],
    };

    render(<SpeakerCard speakerSessions={speakerSessions} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
    expect(screen.getByText("Closing Thoughts")).toBeInTheDocument();
    expect(screen.getByText("16:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    const speakerSessions: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [
        makeSession({ id: "opening-keynote", title: "Opening Keynote" }),
      ],
    };

    render(<SpeakerCard speakerSessions={speakerSessions} />);

    expect(
      screen.getByRole("link", { name: /Opening Keynote/ }),
    ).toHaveAttribute("href", "/en/sessions/opening-keynote");
  });
});
