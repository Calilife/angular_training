import { Injectable, computed, signal } from '@angular/core';
import { ExerciseLog, SessionLog } from '../models';

const STORAGE_KEY = 'matchfit-logs-v1';

@Injectable({ providedIn: 'root' })
export class WorkoutLogService {
  private readonly _sessions = signal<SessionLog[]>(this.load());

  readonly sessions = computed(() =>
    [...this._sessions()].sort((a, b) => b.date.localeCompare(a.date))
  );

  readonly totalSessions = computed(() => this._sessions().length);

  /** Consecutive weeks (ending this week) with at least one logged session */
  readonly weekStreak = computed(() => {
    const weeks = new Set(this._sessions().map((s) => weekKey(new Date(s.date))));
    let streak = 0;
    const cursor = new Date();
    while (weeks.has(weekKey(cursor))) {
      streak++;
      cursor.setDate(cursor.getDate() - 7);
    }
    return streak;
  });

  saveSession(workoutId: string, workoutName: string, exercises: ExerciseLog[], feeling?: number): void {
    const session: SessionLog = {
      id: crypto.randomUUID(),
      workoutId,
      workoutName,
      date: new Date().toISOString(),
      exercises,
      feeling,
    };
    this._sessions.update((s) => [...s, session]);
    this.persist();
  }

  deleteSession(id: string): void {
    this._sessions.update((s) => s.filter((x) => x.id !== id));
    this.persist();
  }

  /** Last logged sets for an exercise, used to pre-fill and show "last time" */
  lastLogFor(exerciseId: string): ExerciseLog | undefined {
    for (const session of this.sessions()) {
      const log = session.exercises.find((e) => e.exerciseId === exerciseId);
      if (log && log.sets.some((s) => s.weight != null || s.reps != null)) return log;
    }
    return undefined;
  }

  /** Best (heaviest) weight ever logged for an exercise */
  bestWeightFor(exerciseId: string): number | null {
    let best: number | null = null;
    for (const session of this._sessions()) {
      for (const ex of session.exercises) {
        if (ex.exerciseId !== exerciseId) continue;
        for (const set of ex.sets) {
          if (set.weight != null && (best === null || set.weight > best)) best = set.weight;
        }
      }
    }
    return best;
  }

  /** Chronological max-weight per session for an exercise (for the trend view) */
  weightHistoryFor(exerciseId: string): { date: string; weight: number }[] {
    const points: { date: string; weight: number }[] = [];
    for (const session of [...this._sessions()].sort((a, b) => a.date.localeCompare(b.date))) {
      const ex = session.exercises.find((e) => e.exerciseId === exerciseId);
      if (!ex) continue;
      const weights = ex.sets.map((s) => s.weight).filter((w): w is number => w != null);
      if (weights.length) points.push({ date: session.date, weight: Math.max(...weights) });
    }
    return points;
  }

  private load(): SessionLog[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SessionLog[]) : [];
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._sessions()));
  }
}

function weekKey(d: Date): string {
  const date = new Date(d);
  // ISO week: shift to Thursday of the current week
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  const week =
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    );
  return `${date.getFullYear()}-W${week}`;
}
