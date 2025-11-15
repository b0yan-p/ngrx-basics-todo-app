/*
   SELECTORS

   When component want to use current loaded data (e.g. list of toDo's )
   They are using selectors to pull in the state from the store
*/

import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer.ts';
import { AppState } from '../app.state.js';

export const selectTodos = (state: AppState) => state.todos;

export const selectAllTodos = createSelector(
  selectTodos,
  (state: TodoState) => state.todos
);
