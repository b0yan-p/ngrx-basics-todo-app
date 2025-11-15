/*
   Effect, same as the reducer, are listening for actions in app.
   When action is dispatched effect will handle it.
   But unlikely as reducer, effect can run whatever sideeffect it likes

   e.g. In case of loading data we would first dispatch the action (loadTodos), 
      since we don't have that data loaded reducer will 'set a flag' in the store changing the status to loading

   Here comes the effect in the story. Once effect detects dispatched action it will go on the server and load new data
    and once the data is fetched it will be dispatched a new action
      1. Load data success
      2. Load data failed
   Those loaded actions now can be handled by reducer since now action has all data that is required by reducer
*/

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, finalize, map, of, switchMap } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { AppState } from '../app.state';
import {
  addTodo,
  addTodoSuccess,
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  markTodoAsDone,
  markTodoAsDoneSuccess,
  markTodoAsNotDone,
  markTodoAsNotDoneSuccess,
  removeTodo,
  removeTodoSuccess,
} from './todo.actions.ts';

@Injectable()
export class TodoEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);
  private service = inject(TodoService);

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.service.getTodos().pipe(
          // Take returned value and return a new success action containing fresh data
          map((todos) => loadTodosSuccess({ todos: todos })),
          // Or... if it error return a new failed action containing an error message
          catchError((error) => of(loadTodosFailed({ error }))),
        ),
      ),
    ),
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({ todo }) => {
        this.service.savingNewItem = true;
        // TODO handle errors
        return this.service.saveTodo(todo).pipe(
          map((todo) => addTodoSuccess({ todo })),
          finalize(() => (this.service.savingNewItem = false)),
        );
      }),
    ),
  );

  markAsDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markTodoAsDone),
      switchMap((action) => {
        this.service.loaders.set(action.id);

        // TODO handle errors
        return this.service.markAsDone(action.id).pipe(
          map((todo) => markTodoAsDoneSuccess({ todo })),
          finalize(() => this.service.loaders.delete(action.id)),
        );
      }),
    ),
  );

  markTodoAsNotDone$ = createEffect(() =>
    this.actions$.pipe(
      ofType(markTodoAsNotDone),
      switchMap((action) => {
        this.service.loaders.set(action.id);

        // TODO handle errors
        return this.service.markAsNotDone(action.id).pipe(
          map((todo) => markTodoAsNotDoneSuccess({ todo })),
          finalize(() => this.service.loaders.delete(action.id)),
        );
      }),
    ),
  );

  removeTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      switchMap((action) => {
        this.service.loaders.set(action.id);

        // TODO handle errors
        return this.service.deleteTodo(action.id).pipe(
          map(() => removeTodoSuccess({ id: action.id })),
          finalize(() => this.service.loaders.delete(action.id)),
        );
      }),
    ),
  );
}
