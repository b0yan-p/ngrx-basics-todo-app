import { NgClass } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';
import {
  markTodoAsDone,
  markTodoAsNotDone,
  removeTodo,
} from '../../store/todo/todo.actions.ts';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  todo = input.required<Todo>();

  private store = inject(Store);
  todoService = inject(TodoService);

  loading = computed(() => this.todoService.loaders.has(this.todo().id));

  markAsDone(id: string) {
    this.store.dispatch(markTodoAsDone({ id }));
  }

  markAsNotDone(id: string) {
    this.store.dispatch(markTodoAsNotDone({ id }));
  }

  onRemoveTodo(todo: Todo) {
    this.store.dispatch(removeTodo({ id: todo.id }));
  }
}
