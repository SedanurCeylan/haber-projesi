import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterModule],
  template: `
    <app-header (search)="onSearch($event)"></app-header>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(private router: Router) {}

  onSearch(term: string) {
    // Arama yapılırken direkt URL'i güncelle ve HomeComponent aç
    this.router.navigate(['/'], { queryParams: { search: term } });
  }
}
