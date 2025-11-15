import { TodoState } from './todo/todo.reducer.ts';

export interface AppState {
  todos: TodoState;
}
