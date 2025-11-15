# ngrx-basics-todo-app

A small Angular + NgRx Todo application built to practice core state management concepts in a realistic but simple example.

> Goal: understand how `actions`, `reducers`, `selectors`, and `effects` work together in a real flow (load, add, update, delete).

---

## Features

- ✅ Display a list of todos
- ✅ Add a new todo (pessimistic create: waits for API success)
- ✅ Mark todo as **done** / **not done**
- ✅ Delete a todo
- ✅ Per-item loading state for actions (e.g. disabling buttons while a request is in progress)
- ✅ Basic statistics component (e.g. total, completed, not completed)

All data is stored in a fake backend using [`json-server`](https://github.com/typicode/json-server).

---

## Tech Stack

- **Angular** (standalone components)
- **NgRx**
  - `@ngrx/store`
  - `@ngrx/effects`
- **HTTP & fake backend**
  - `HttpClient`
  - `json-server` (local API)
- **Tooling**
  - TypeScript
  - npm

---

## NgRx Concepts Covered

- **Actions**
  - Page/UI actions: `loadTodos`, `addTodo`, `removeTodo`, `markTodoAsDone`, `markTodoAsNotDone`
  - API/result actions: `loadTodosSuccess`, `loadTodosFailed`, `addTodoSuccess`, `removeTodoSuccess`, etc.

- **Reducer**
  - Single `TodoState` slice with:
    - `todos: Todo[]`
    - `status` (`pending | loading | success | error`)
    - `error: string | null`
  - Immutable updates for:
    - loading todos
    - adding a todo
    - removing a todo
    - marking todo as done / not done

- **Selectors**
  - Basic selector to get all todos from the store
  - Used in components via `store.select(...)` + `AsyncPipe`

- **Effects**
  - `loadTodos$` – calls backend to fetch todos
  - `saveTodo$` – handles todo creation (pessimistic; waits for success)
  - `markAsDone$` / `markTodoAsNotDone$` – update completion status
  - `removeTodo$` – delete todo with per-item loader
  - Using `switchMap`, `map`, `catchError`, `finalize`, and `ofType`

- **UI & UX**
  - Input is only cleared after `addTodo` succeeds
  - Buttons disabled while:
    - input is invalid
    - request is in progress (`savingNewItem` or per-item loader)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/ngrx-basics-todo-app.git
cd ngrx-basics-todo-app
```

### 2. Install dependencies

`npm install`

### 3. Start the fake backend `(json-server)`

- Make sure you have a db.json file in the project root, for example:

```
{
  "todos": [
    { "id": "1", "description": "Learn NgRx basics", "completed": false }
  ]
}
```

- Then run: `npx json-server db.json --port 3000`
- The API will be available at: `http://localhost:3000/todos`
