import { OPENING_HOURS, RESTAURANT } from "../config";

export interface OpenStatus {
  isOpen: boolean;
  /** Short status, e.g. "Ouvert maintenant" */
  label: string;
  /** Detail line, e.g. "Ferme à 23:00" */
  detail: string;
}

const WEEKDAY_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

/** Current weekday index and minutes since midnight in the restaurant's time zone */
function getLocalTime(date: Date): { day: number; minutes: number } {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: RESTAURANT.timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const parts = formatter.formatToParts(date);
  const read = (type: string) => parts.find((p) => p.type === type)?.value ?? "";

  return {
    day: WEEKDAY_INDEX[read("weekday")] ?? 0,
    minutes: Number(read("hour")) * 60 + Number(read("minute")),
  };
}

/** Current weekday index (0 = Dimanche ... 6 = Samedi) in the restaurant's time zone */
export function getLocalDay(date: Date = new Date()): number {
  return getLocalTime(date).day;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { day, minutes } = getLocalTime(date);
  const today = OPENING_HOURS.find((d) => d.day === day);
  const yesterday = OPENING_HOURS.find((d) => d.day === (day + 6) % 7);

  // Overnight slot started yesterday (closing time earlier than opening time)
  if (yesterday?.open && yesterday.close) {
    const open = toMinutes(yesterday.open);
    const close = toMinutes(yesterday.close);
    if (close <= open && minutes < close) {
      return { isOpen: true, label: "Ouvert maintenant", detail: `Ferme à ${yesterday.close}` };
    }
  }

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);

    if (close > open) {
      if (minutes >= open && minutes < close) {
        return { isOpen: true, label: "Ouvert maintenant", detail: `Ferme à ${today.close}` };
      }
    } else if (minutes >= open) {
      // Overnight slot starting today
      return { isOpen: true, label: "Ouvert maintenant", detail: `Ferme à ${today.close}` };
    }
  }

  return { isOpen: false, label: "Fermé", detail: getNextOpening(day, minutes) };
}

function getNextOpening(day: number, minutes: number): string {
  for (let offset = 0; offset < 7; offset++) {
    const candidate = OPENING_HOURS.find((d) => d.day === (day + offset) % 7);
    if (!candidate?.open) continue;
    if (offset === 0 && minutes >= toMinutes(candidate.open)) continue;
    return offset === 0
      ? `Ouvre à ${candidate.open}`
      : `Ouvre ${candidate.label.toLowerCase()} à ${candidate.open}`;
  }
  return "";
}
