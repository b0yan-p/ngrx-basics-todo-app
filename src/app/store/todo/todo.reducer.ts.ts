/*
   REDUCERS
   In general reducers are responsible for determination how state should be modified

   Usually we have one reducer for one feature.
   Reducer detects the action, take the current state and store the new state in the store.
   Important concept is that reducers are pure functions 
      - so basically for same input reducer will always return same output
      - Reducers should NOT create any side effects (reducers should not change anything anywhere inside the app)
            e.g. We cannot make any async calls to go load data from server
*/

import { createReducer, on } from '@ngrx/store';
import { Todo } from '../../models/todo';
import {
  addTodoSuccess,
  loadTodos,
  loadTodosFailed,
  loadTodosSuccess,
  markTodoAsDoneSuccess,
  markTodoAsNotDoneSuccess,
  removeTodoSuccess,
} from './todo.actions.ts';

/*
   Basically store is just a massive object with some properties that store the data.
   In this case we want to define some interface that will represent our store state.
   
   Data we need in store state is:
      1. list of ToDo's
      2. error string message in case that loading is failed
      3. status of state
         - pending - we attempt to load data
         - loading - we are currently loading data
         - success - we successfully loaded data
         - error - we failed to load data
*/
export interface TodoState {
  todos: Todo[];
  error: string | null;
  status: StateStatus;
}

export enum StateStatus {
  Pending = 'pending',
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

/*
   This is init state in our store. 
   Basically this state will be available in our store before any action is dispatched
*/
export const initialState: TodoState = {
  todos: [],
  error: null,
  status: StateStatus.Pending,
};

// Creating new reducer
export const todoReducer = createReducer(
  // Supply initial state
  initialState,

  // Add new todo to the todos array
  //*  todoDescription is prop that we defined in addTodo action and when we dispatch this action
  //*  the todoDescription will be sent together with the action
  on(addTodoSuccess, (state, { todo }) => ({
    ...state,
    todos: [...state.todos, todo],
    status: StateStatus.Success,
  })),

  // On success remove
  on(removeTodoSuccess, (state, { id }) => ({
    ...state,
    status: StateStatus.Success,
    error: null,
    todos: state.todos.filter((e) => e.id !== id),
  })),

  //Fetch data from store
  on(loadTodos, (state) => ({ ...state, status: StateStatus.Loading })),

  on(loadTodosSuccess, (state, { todos }) => ({
    ...state,
    todos: [...todos],
    error: null,
    status: StateStatus.Success,
  })),

  on(loadTodosFailed, (state, { error }) => ({
    ...state,
    error: error,
    status: StateStatus.Error,
  })),

  on(markTodoAsDoneSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((t) => (t.id === todo.id ? todo : t)),
    status: StateStatus.Success,
  })),

  on(markTodoAsNotDoneSuccess, (state, { todo }) => ({
    ...state,
    todos: state.todos.map((e) => (e.id === todo.id ? todo : e)),
    status: StateStatus.Success,
  })),
);
