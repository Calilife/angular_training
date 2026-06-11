import { Component, computed, signal } from '@angular/core';
import { ALL_EXERCISES } from '../data/program';
import { ExerciseCategory } from '../models';
import { ExerciseCardComponent } from '../components/exercise-card.component';

const FILTERS: { value: ExerciseCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'strength', label: '💪 Strength' },
  { value: 'power', label: '⚡ Power' },
  { value: 'injury-prevention', label: '🛡️ Injury Prevention' },
  { value: 'core', label: '🎯 Core' },
  { value: 'upper-body', label: '🏋️ Upper Body' },
  { value: 'mobility', label: '🧘 Mobility' },
];

@Component({
  selector: 'app-library',
  imports: [ExerciseCardComponent],
  template: `
    <h2>Exercise Library</h2>
    <p class="sub">
      Every exercise in your program, with technique videos and the focus point for each.
      Filter 🛡️ Injury Prevention to see the over-30 non-negotiables.
    </p>

    <div class="filters">
      @for (f of filters; track f.value) {
        <button
          class="filter"
          [class.active]="filter() === f.value"
          (click)="filter.set(f.value)"
        >{{ f.label }}</button>
      }
    </div>

    @for (ex of filtered(); track ex.id) {
      <app-exercise-card [exercise]="ex" />
    }
  `,
  styles: `
    h2 { margin: 0 0 4px; }
    .sub { margin: 0 0 16px; color: var(--text-dim); font-size: 0.9rem; }
    .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
    .filter {
      background: var(--surface); border: 1px solid var(--border); color: var(--text);
      border-radius: 99px; padding: 6px 14px; font-size: 0.85rem; cursor: pointer;
    }
    .filter.active { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 600; }
    app-exercise-card { display: block; margin-bottom: 16px; }
  `,
})
export class LibraryComponent {
  readonly filters = FILTERS;
  readonly filter = signal<ExerciseCategory | 'all'>('all');

  readonly filtered = computed(() =>
    this.filter() === 'all'
      ? ALL_EXERCISES
      : ALL_EXERCISES.filter((e) => e.category === this.filter())
  );
}
