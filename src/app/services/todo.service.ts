import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, first, Observable, of, tap, throwError } from 'rxjs';
import { Todo } from '../models/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  url = 'http://localhost:3000/';

  http = inject(HttpClient);

  loaders = new Map<string, void>();
  savingNewItem = false;

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.url}todos`);
  }

  saveTodo(todo: Omit<Todo, 'id'>): Observable<Todo> {
    return this.http.post<Todo>(`${this.url}todos`, { ...todo }).pipe(
      first(),
      catchError((err) => {
        console.log('err', err);
        // this.snackbar.open();
        throw err;
      })
    );
  }

  markAsDone(id: string) {
    return this.http
      .patch<Todo>(`${this.url}todos/${id}`, { id, completed: true })
      .pipe(first());
  }

  markAsNotDone(id: string) {
    return this.http
      .patch<Todo>(`${this.url}todos/${id}`, { id, completed: false })
      .pipe(first());
  }

  deleteTodo(id: string) {
    return this.http.delete(`${this.url}todos/${id}`).pipe(first());
  }
}
