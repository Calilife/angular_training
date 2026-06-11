import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WEEK_PLAN, getDayPlan } from '../data/program';
import { WorkoutLogService } from '../services/workout-log.service';

@Component({
  selector: 'app-week',
  imports: [RouterLink],
  template: `
    <section class="today card" [class]="'card today type-' + today().type">
      <p class="today-label">Today · {{ today().day }}</p>
      <h2>{{ today().emoji }} {{ today().title }}</h2>
      <p class="desc">{{ today().description }}</p>
      @if (today().workoutId) {
        <a class="btn-primary" [routerLink]="['/workout', today().workoutId]">Start workout →</a>
      }
    </section>

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

    <h2 class="section-title">Your week</h2>
    <p class="section-sub">
      Built around your Tuesday & Friday matches: heavy legs on Sunday (48h before and after a match),
      upper body & injury-proofing on Wednesday, rest before match days.
    </p>

    <div class="week-grid">
      @for (day of orderedWeek(); track day.dayIndex) {
        <article class="day card" [class.is-today]="day.dayIndex === todayIndex" [class]="'day card type-' + day.type">
          <header>
            <span class="day-name">{{ day.day }}</span>
            @if (day.dayIndex === todayIndex) { <span class="today-chip">TODAY</span> }
          </header>
          <h3>{{ day.emoji }} {{ day.title }}</h3>
          <p>{{ day.description }}</p>
          @if (day.workoutId) {
            <a class="btn-secondary" [routerLink]="['/workout', day.workoutId]">View workout</a>
          }
        </article>
      }
    </div>
  `,
  styles: `
    .today { border: 1px solid var(--accent); display: flex; flex-direction: column; gap: 8px; }
    .today-label { margin: 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent); }
    .today h2 { margin: 0; }
    .desc { margin: 0; color: var(--text-dim); }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
    .stat { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 14px; }
    .stat-value { font-size: 1.8rem; font-weight: 700; color: var(--accent); }
    .stat-label { font-size: 0.8rem; color: var(--text-dim); }
    .section-title { margin: 24px 0 4px; }
    .section-sub { margin: 0 0 12px; color: var(--text-dim); font-size: 0.9rem; }
    .week-grid { display: grid; gap: 12px; }
    .day { display: flex; flex-direction: column; gap: 6px; }
    .day header { display: flex; justify-content: space-between; align-items: center; }
    .day-name { font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-dim); }
    .today-chip { font-size: 0.7rem; font-weight: 700; color: var(--bg); background: var(--accent); border-radius: 99px; padding: 2px 8px; }
    .day h3 { margin: 0; font-size: 1.05rem; }
    .day p { margin: 0; font-size: 0.88rem; color: var(--text-dim); }
    .day.is-today { border: 1px solid var(--accent); }
    .type-match { background: linear-gradient(135deg, var(--surface), rgba(34, 197, 94, 0.08)); }
    .btn-secondary { align-self: flex-start; margin-top: 6px; }
    @media (min-width: 720px) { .week-grid { grid-template-columns: 1fr 1fr; } }
  `,
})
export class WeekComponent {
  readonly log = inject(WorkoutLogService);
  readonly todayIndex = new Date().getDay();
  readonly today = computed(() => getDayPlan(this.todayIndex));

  /** Week starting Monday for display */
  orderedWeek() {
    return [...WEEK_PLAN].sort(
      (a, b) => ((a.dayIndex + 6) % 7) - ((b.dayIndex + 6) % 7)
    );
  }
}
