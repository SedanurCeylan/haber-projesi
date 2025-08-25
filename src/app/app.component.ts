import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,  
    RouterModule
  ],
  template: `
    <app-header (search)="onSearch($event)"></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer> 
  `
})
export class AppComponent {
  title = 'newspaper';
  constructor(private router: Router) {}

  onSearch(term: string) {
    this.router.navigate(['/'], { queryParams: { search: term } });
  }
}
