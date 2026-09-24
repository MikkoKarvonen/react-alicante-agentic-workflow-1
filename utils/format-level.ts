import type { Level } from "@/types/session";

/** The `session_level` enum is lowercase in the schema; badges show it capitalized. */
export function formatLevel(level: Level): string {
  return level.charAt(0).toUpperCase() + level.slice(1);
}
