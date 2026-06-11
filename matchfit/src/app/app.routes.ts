import { Routes } from '@angular/router';
import { WeekComponent } from './pages/week.component';
import { WorkoutComponent } from './pages/workout.component';
import { LibraryComponent } from './pages/library.component';
import { ProgressComponent } from './pages/progress.component';

export const routes: Routes = [
  { path: '', component: WeekComponent, title: 'MatchFit · This Week' },
  { path: 'workout/:id', component: WorkoutComponent, title: 'MatchFit · Workout' },
  { path: 'library', component: LibraryComponent, title: 'MatchFit · Exercises' },
  { path: 'progress', component: ProgressComponent, title: 'MatchFit · Progress' },
  { path: '**', redirectTo: '' },
];
