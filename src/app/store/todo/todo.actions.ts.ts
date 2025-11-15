/*
  Component fire action those actions are handled by reducer or effects
  Component itself doesn't know how to update store or what services are needed for store update

  When action is dispatched it will be handled by reducer immediately
  so we have to provide all data to the reducer needs to make the state modification immediately
*/

/* 
  This is example of one action
  We need to add one ToDo item in our list and component
   have to notify subscribers that add new ToDo is fired
*/

import { createAction, props } from '@ngrx/store';
import { Todo } from '../../models/todo';

/*
  We create action with createAction function with two parameters
    1.name of the action
        *why this format explain 
      - Typical format of actions is '[Feature Name] Action Name' ()
    2. payload - its what data we want to send to send with the action dispatch
*/
// #region Add Todo
export const addTodo = createAction(
  '[Todo Page] Add Todo',
  props<{ todo: Omit<Todo, 'id'> }>()
);

export const addTodoSuccess = createAction(
  '[Todo Page] Add Todo Success',
  props<{ todo: Todo }>()
);
// #endregion

// #region remove Todo
export const removeTodo = createAction(
  '[Todo Page] Remove Todo',
  props<{ id: string }>()
);

export const removeTodoSuccess = createAction(
  '[Todo Page] Remove Todo Success',
  props<{ id: string }>()
);
// #endregion

// #region Load Todos
// Trigger loading process
export const loadTodos = createAction('[Todo Page] Load Todos');

export const loadTodosSuccess = createAction(
  '[Todo API] Todo Load Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailed = createAction(
  '[Todo API] Todo Load Failed',
  props<{ error: string }>()
);
// #endregion

// #region Mark Todo as Done/NotDone
export const markTodoAsDone = createAction(
  '[Todo API] Mark Todo As Done',
  props<{ id: string }>()
);

export const markTodoAsDoneSuccess = createAction(
  '[Todo API] Mark Todo As Done Success',
  props<{ todo: Todo }>()
);

export const markTodoAsNotDone = createAction(
  '[Todo API] Mark Todo As Not Done',
  props<{ id: string }>()
);

export const markTodoAsNotDoneSuccess = createAction(
  '[Todo API] Mark Todo As Not Done Success',
  props<{ todo: Todo }>()
);
// #endregion
