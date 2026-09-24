import type { Session } from "@/types/session";

/**
 * The `closing-panel` session lists this instead of a person's name — it's a
 * panel with the whole day's speakers, not one speaker's own session. Never
 * list it on the speakers page.
 */
const NOT_A_SPEAKER = "Full speaker lineup";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/**
 * Groups sessions by speaker, sorted by speaker name. Each speaker's own
 * sessions stay in the order `sessions` gave them (chronological, since
 * `fetchSessions` orders by `start_time`).
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (session.speaker === NOT_A_SPEAKER) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, sessions]) => ({
    speaker,
    sessions,
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
