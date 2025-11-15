import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { todoReducer } from './store/todo/todo.reducer.ts';
import { provideEffects } from '@ngrx/effects';
import { TodoEffects } from './store/todo/todo.effects.ts';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ todos: todoReducer }),
    provideEffects([TodoEffects]),
  ],
};
