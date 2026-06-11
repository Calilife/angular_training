import { Component, computed, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WorkoutLogService } from '../services/workout-log.service';
import { ALL_EXERCISES } from '../data/program';

const FEELING_EMOJI: Record<number, string> = { 1: '😫', 2: '😕', 3: '🙂', 4: '💪', 5: '🔥' };

@Component({
  selector: 'app-progress',
  imports: [DatePipe],
  template: `
    <h2>Progress</h2>

    <section class="stats">
      <div class="stat card">
        <span class="stat-value">{{ log.weekStreak() }}</span>
        <span class="stat-label">week streak 🔥</span>
      </div>
      <div class="stat card">
        <span class="stat-value">{{ log.totalSessions() }}</span>
        <span class="stat-label">sessions logged</span>
      </div>
    </section>

    @if (personalBests().length) {
      <h3 class="section-title">🏆 Personal bests</h3>
      <div class="pb-grid">
        @for (pb of personalBests(); track pb.name) {
          <div class="pb card">
            <span class="pb-name">{{ pb.name }}</span>
            <span class="pb-value">{{ pb.weight }} kg</span>
            @if (pb.trend !== 0) {
              <span class="pb-trend" [class.up]="pb.trend > 0" [class.down]="pb.trend < 0">
                {{ pb.trend > 0 ? '▲' : '▼' }} {{ abs(pb.trend) }} kg since first log
              </span>
            }
          </div>
        }
      </div>
    }

    <h3 class="section-title">Session history</h3>
    @if (log.sessions().length === 0) {
      <p class="empty card">
        No sessions yet. Open today's workout, log your sets, and hit
        <strong>Finish & save</strong> — your history and personal bests will show up here.
      </p>
    }
    @for (session of log.sessions(); track session.id) {
      <article class="session card">
        <header>
          <div>
            <h4>{{ session.workoutName }}</h4>
            <span class="date">{{ session.date | date: 'EEE, MMM d, y · HH:mm' }}</span>
          </div>
          <div class="header-right">
            @if (session.feeling) { <span class="feeling">{{ feelingEmoji(session.feeling) }}</span> }
            <button class="delete" (click)="remove(session.id)" aria-label="Delete session">🗑</button>
          </div>
        </header>
        @if (session.exercises.length) {
          <ul>
            @for (ex of session.exercises; track ex.exerciseId) {
              <li>
                <span class="ex-name">{{ ex.exerciseName }}</span>
                <span class="ex-sets">
                  @for (s of ex.sets; track $index; let last = $last) {
                    {{ s.weight ?? '–' }}kg×{{ s.reps ?? '–' }}{{ last ? '' : ' · ' }}
                  }
                </span>
              </li>
            }
          </ul>
        } @else {
          <p class="no-sets">Completed (no sets logged)</p>
        }
      </article>
    }
  `,
  styles: `
    h2 { margin: 0 0 12px; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .stat { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px; }
    .stat-value { font-size: 1.8rem; font-weight: 700; color: var(--accent); }
    .stat-label { font-size: 0.8rem; color: var(--text-dim); }
    .section-title { margin: 24px 0 10px; }
    .pb-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
    .pb { display: flex; flex-direction: column; gap: 2px; padding: 12px; }
    .pb-name { font-size: 0.78rem; color: var(--text-dim); }
    .pb-value { font-size: 1.3rem; font-weight: 700; color: var(--accent); }
    .pb-trend { font-size: 0.75rem; }
    .pb-trend.up { color: var(--accent); }
    .pb-trend.down { color: #f87171; }
    .empty { color: var(--text-dim); font-size: 0.92rem; }
    .session { margin-bottom: 12px; display: flex; flex-direction: column; gap: 8px; }
    .session header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; }
    .session h4 { margin: 0; }
    .date { font-size: 0.78rem; color: var(--text-dim); }
    .header-right { display: flex; align-items: center; gap: 8px; }
    .feeling { font-size: 1.2rem; }
    .delete { background: none; border: none; cursor: pointer; font-size: 1rem; opacity: 0.5; }
    .delete:hover { opacity: 1; }
    .session ul { margin: 0; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 4px; }
    .session li { display: flex; justify-content: space-between; gap: 12px; font-size: 0.88rem; flex-wrap: wrap; }
    .ex-name { font-weight: 500; }
    .ex-sets { color: var(--text-dim); }
    .no-sets { margin: 0; font-size: 0.85rem; color: var(--text-dim); }
  `,
})
export class ProgressComponent {
  readonly log = inject(WorkoutLogService);
  readonly abs = Math.abs;

  readonly personalBests = computed(() => {
    // Recompute when sessions change
    this.log.sessions();
    return ALL_EXERCISES.map((ex) => {
      const best = this.log.bestWeightFor(ex.id);
      if (best === null) return null;
      const history = this.log.weightHistoryFor(ex.id);
      const trend = history.length >= 2 ? best - history[0].weight : 0;
      return { name: ex.name, weight: best, trend };
    }).filter((x): x is { name: string; weight: number; trend: number } => x !== null);
  });

  feelingEmoji(value: number): string {
    return FEELING_EMOJI[value] ?? '';
  }

  remove(id: string): void {
    if (confirm('Delete this session?')) this.log.deleteSession(id);
  }
}
