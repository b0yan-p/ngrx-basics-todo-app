import { Component, computed, input } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-stats',
  standalone: true,
  imports: [],
  templateUrl: './todo-stats.component.html',
  styleUrl: './todo-stats.component.scss',
})
export class TodoStatsComponent {
  todos = input.required<Todo[]>();

  completedCount = computed(
    () => this.todos().filter((e) => e.completed).length
  );
  todoCount = computed(() => this.todos().length);
}
