import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TodoItemComponent } from '../../components/todo-item/todo-item.component.js';
import { TodoStatsComponent } from '../../components/todo-stats/todo-stats.component.js';
import { Todo } from '../../models/todo.js';
import { TodoService } from '../../services/todo.service.js';
import { addTodo, loadTodos } from '../../store/todo/todo.actions.ts';
import { selectAllTodos } from '../../store/todo/todo.selectors.ts.js';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    TodoStatsComponent,
    TodoItemComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  private store = inject(Store);
  todoService = inject(TodoService);

  public todos$ = this.store.select(selectAllTodos);

  ctrl = new FormControl<string>('', Validators.required);

  ngOnInit(): void {
    this.store.dispatch(loadTodos());
  }

  addTodo() {
    if (this.ctrl.invalid) return;

    let todo: Omit<Todo, 'id'> = {
      description: this.ctrl.value!,
      completed: false,
    };

    this.store.dispatch(addTodo({ todo }));

    this.ctrl.reset();
  }
}
