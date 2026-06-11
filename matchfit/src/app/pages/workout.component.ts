import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { getWorkout } from '../data/program';
import { ExerciseLog, LoggedSet } from '../models';
import { WorkoutLogService } from '../services/workout-log.service';
import { ExerciseCardComponent } from '../components/exercise-card.component';

@Component({
  selector: 'app-workout',
  imports: [RouterLink, FormsModule, ExerciseCardComponent],
  template: `
    @if (workout(); as w) {
      <a routerLink="/" class="back">← Back to week</a>
      <header class="wo-header">
        <h2>{{ w.emoji }} {{ w.name }}</h2>
        <p class="intent">{{ w.intent }}</p>
        <span class="duration">⏱ {{ w.duration }}</span>
      </header>

      <section class="card warmup">
        <h3>🔥 Warm-up (do not skip — you're over 30 now)</h3>
        <ul>
          @for (item of w.warmup; track item) { <li>{{ item }}</li> }
        </ul>
      </section>

      @for (ex of w.exercises; track ex.id; let i = $index) {
        <app-exercise-card [exercise]="ex">
          <div class="logger">
            <div class="logger-head">
              <span>Log your sets</span>
              @if (lastTime(ex.id); as last) {
                <span class="last-time">Last time: {{ last }}</span>
              }
            </div>
            <div class="set-rows">
              @for (set of logs()[i].sets; track $index; let s = $index) {
                <div class="set-row">
                  <span class="set-num">Set {{ s + 1 }}</span>
                  <input type="number" inputmode="decimal" placeholder="kg" [(ngModel)]="set.weight" min="0" />
                  <input type="number" inputmode="numeric" placeholder="reps" [(ngModel)]="set.reps" min="0" />
                </div>
              }
            </div>
          </div>
        </app-exercise-card>
      }

      <section class="card notes">
        <h3>📋 Coach's notes</h3>
        <ul>
          @for (note of w.notes; track note) { <li>{{ note }}</li> }
        </ul>
      </section>

      <section class="card finish">
        <h3>How did it feel?</h3>
        <div class="feelings">
          @for (f of feelings; track f.value) {
            <button
              class="feeling"
              [class.selected]="feeling() === f.value"
              (click)="feeling.set(f.value)"
            >{{ f.emoji }}</button>
          }
        </div>
        @if (saved()) {
          <p class="saved">✅ Session saved! See it in Progress.</p>
        } @else {
          <button class="btn-primary" (click)="finish()">Finish & save session</button>
        }
      </section>
    } @else {
      <p>Workout not found. <a routerLink="/">Back to week</a></p>
    }
  `,
  styles: `
    .back { display: inline-block; margin-bottom: 12px; color: var(--accent); text-decoration: none; }
    .wo-header h2 { margin: 0 0 6px; }
    .intent { margin: 0 0 6px; color: var(--text-dim); }
    .duration { font-size: 0.85rem; color: var(--accent); font-weight: 600; }
    .warmup, .notes { margin: 16px 0; }
    .warmup h3, .notes h3 { margin: 0 0 8px; font-size: 1rem; }
    .warmup ul, .notes ul { margin: 0; padding-left: 20px; display: flex; flex-direction: column; gap: 4px; font-size: 0.9rem; }
    app-exercise-card { display: block; margin-bottom: 16px; }
    .logger { background: var(--surface-2); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 8px; }
    .logger-head { display: flex; justify-content: space-between; font-size: 0.82rem; color: var(--text-dim); flex-wrap: wrap; gap: 4px; }
    .last-time { color: var(--accent); }
    .set-rows { display: flex; flex-direction: column; gap: 6px; }
    .set-row { display: grid; grid-template-columns: 56px 1fr 1fr; gap: 8px; align-items: center; }
    .set-num { font-size: 0.8rem; color: var(--text-dim); }
    input { background: var(--bg); border: 1px solid var(--border); color: var(--text); border-radius: 8px; padding: 8px 10px; font-size: 1rem; width: 100%; }
    input:focus { outline: none; border-color: var(--accent); }
    .finish { display: flex; flex-direction: column; gap: 12px; align-items: flex-start; margin-bottom: 24px; }
    .finish h3 { margin: 0; font-size: 1rem; }
    .feelings { display: flex; gap: 8px; }
    .feeling { font-size: 1.5rem; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; padding: 6px 10px; cursor: pointer; }
    .feeling.selected { border-color: var(--accent); background: rgba(34, 197, 94, 0.15); }
    .saved { color: var(--accent); font-weight: 600; margin: 0; }
  `,
})
export class WorkoutComponent {
  id = input.required<string>();

  private readonly logService = inject(WorkoutLogService);
  private readonly router = inject(Router);

  readonly workout = computed(() => getWorkout(this.id()));
  readonly feeling = signal<number | undefined>(undefined);
  readonly saved = signal(false);

  readonly feelings = [
    { value: 1, emoji: '😫' },
    { value: 2, emoji: '😕' },
    { value: 3, emoji: '🙂' },
    { value: 4, emoji: '💪' },
    { value: 5, emoji: '🔥' },
  ];

  /** Mutable log model: one entry per exercise, 3 empty sets each */
  readonly logs = computed<ExerciseLog[]>(() => {
    const w = this.workout();
    if (!w) return [];
    return w.exercises.map((ex) => ({
      exerciseId: ex.id,
      exerciseName: ex.name,
      sets: [emptySet(), emptySet(), emptySet()],
    }));
  });

  lastTime(exerciseId: string): string | null {
    const last = this.logService.lastLogFor(exerciseId);
    if (!last) return null;
    const filled = last.sets.filter((s) => s.weight != null || s.reps != null);
    return filled.map((s) => `${s.weight ?? '–'}kg × ${s.reps ?? '–'}`).join(', ');
  }

  finish(): void {
    const w = this.workout();
    if (!w) return;
    const logged = this.logs()
      .map((l) => ({ ...l, sets: l.sets.filter((s) => s.weight != null || s.reps != null) }))
      .filter((l) => l.sets.length > 0);
    this.logService.saveSession(w.id, w.name, logged, this.feeling());
    this.saved.set(true);
    setTimeout(() => this.router.navigate(['/progress']), 1200);
  }
}

function emptySet(): LoggedSet {
  return { weight: null, reps: null };
}
