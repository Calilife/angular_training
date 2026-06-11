export type ExerciseCategory =
  | 'strength'
  | 'power'
  | 'injury-prevention'
  | 'core'
  | 'upper-body'
  | 'mobility';

export interface Exercise {
  id: string;
  name: string;
  category: ExerciseCategory;
  /** The single most important thing to focus on while performing it */
  focus: string;
  /** Why this matters for an over-30 soccer player */
  why: string;
  muscles: string[];
  sets: string;
  rest: string;
  cues: string[];
  /** YouTube video id for an embedded technique video (may be unavailable in some regions) */
  videoId?: string;
  /** Always-working YouTube search query as fallback */
  videoSearch: string;
  /** Easier / no-equipment alternative */
  alternative?: string;
}

export interface Workout {
  id: string;
  name: string;
  emoji: string;
  intent: string;
  duration: string;
  warmup: string[];
  exercises: Exercise[];
  notes: string[];
}

export type DayType = 'match' | 'gym' | 'rest' | 'recovery';

export interface DayPlan {
  /** 0 = Sunday ... 6 = Saturday, matching JS Date.getDay() */
  dayIndex: number;
  day: string;
  type: DayType;
  title: string;
  emoji: string;
  description: string;
  workoutId?: string;
}

export interface LoggedSet {
  weight: number | null;
  reps: number | null;
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: LoggedSet[];
}

export interface SessionLog {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string; // ISO
  exercises: ExerciseLog[];
  feeling?: number; // 1-5
}
