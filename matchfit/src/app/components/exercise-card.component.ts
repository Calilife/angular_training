import { Component, input } from '@angular/core';
import { Exercise } from '../models';
import { VideoEmbedComponent } from './video-embed.component';

const CATEGORY_LABELS: Record<Exercise['category'], { label: string; cls: string }> = {
  strength: { label: '💪 Strength', cls: 'cat-strength' },
  power: { label: '⚡ Power', cls: 'cat-power' },
  'injury-prevention': { label: '🛡️ Injury Prevention', cls: 'cat-injury' },
  core: { label: '🎯 Core', cls: 'cat-core' },
  'upper-body': { label: '🏋️ Upper Body', cls: 'cat-upper' },
  mobility: { label: '🧘 Mobility', cls: 'cat-mobility' },
};

@Component({
  selector: 'app-exercise-card',
  imports: [VideoEmbedComponent],
  template: `
    <article class="card exercise-card">
      <header class="ex-header">
        <h3>{{ exercise().name }}</h3>
        <span class="badge" [class]="'badge ' + category().cls">{{ category().label }}</span>
      </header>

      <p class="focus"><strong>🎯 Focus:</strong> {{ exercise().focus }}</p>

      <div class="prescription">
        <div><span class="label">Sets × Reps</span><span class="value">{{ exercise().sets }}</span></div>
        <div><span class="label">Rest</span><span class="value">{{ exercise().rest }}</span></div>
        <div><span class="label">Muscles</span><span class="value">{{ exercise().muscles.join(', ') }}</span></div>
      </div>

      <app-video-embed [videoId]="exercise().videoId" [searchQuery]="exercise().videoSearch" />

      <details>
        <summary>Why it matters for you & how to do it</summary>
        <p class="why">{{ exercise().why }}</p>
        <ul class="cues">
          @for (cue of exercise().cues; track cue) {
            <li>{{ cue }}</li>
          }
        </ul>
        @if (exercise().alternative) {
          <p class="alt"><strong>No equipment / easier:</strong> {{ exercise().alternative }}</p>
        }
      </details>

      <ng-content />
    </article>
  `,
  styles: `
    .exercise-card { display: flex; flex-direction: column; gap: 12px; }
    .ex-header { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; }
    .ex-header h3 { margin: 0; font-size: 1.1rem; }
    .focus { margin: 0; background: var(--surface-2); border-left: 3px solid var(--accent); padding: 8px 12px; border-radius: 0 8px 8px 0; font-size: 0.92rem; }
    .prescription { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    .prescription > div { background: var(--surface-2); border-radius: 8px; padding: 8px; display: flex; flex-direction: column; gap: 2px; }
    .prescription .label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim); }
    .prescription .value { font-size: 0.85rem; font-weight: 600; }
    details summary { cursor: pointer; color: var(--accent); font-size: 0.9rem; }
    .why { font-size: 0.9rem; color: var(--text-dim); margin: 10px 0; }
    .cues { margin: 0; padding-left: 20px; font-size: 0.9rem; display: flex; flex-direction: column; gap: 4px; }
    .alt { font-size: 0.85rem; margin: 10px 0 0; color: var(--text-dim); }
    @media (max-width: 480px) { .prescription { grid-template-columns: 1fr 1fr; } .prescription > div:last-child { grid-column: span 2; } }
  `,
})
export class ExerciseCardComponent {
  exercise = input.required<Exercise>();

  category() {
    return CATEGORY_LABELS[this.exercise().category];
  }
}
