import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ngrxTest';
  router = inject(Router);
  kme?: Subscription;

  store = inject(StoreService);

  snackbar: any;

  ngOnInit() {
    setTimeout(() => {
      this.title = 'Updated Title from AppComponent';
    }, 3000);
  }

  navigate() {
    this.router.navigate(['c1']);
  }
}
