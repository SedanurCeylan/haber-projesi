import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  @Input() totalResults: number = 0;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Output() pageChange: EventEmitter<number> = new EventEmitter<number>();

  get totalPages(): number {
    return this.pageSize > 0 ? Math.ceil(this.totalResults / this.pageSize) : 0;
  }

  changePage(page: number | string): void {

    const numericPage = typeof page === 'number' ? page : parseInt(page, 10);
    
    if (!isNaN(numericPage) && numericPage >= 1 && numericPage <= this.totalPages && numericPage !== this.currentPage) {
      this.currentPage = numericPage;
      this.pageChange.emit(numericPage);
    }
  }

  get visiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    if (this.totalPages <= maxVisible) {
      for (let i = 1; i <= this.totalPages; i++) pages.push(i);
    } else {
      if (this.currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 3) {
        pages.push(1, '...', this.totalPages - 4, this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(
          1,
          '...',
          this.currentPage - 1,
          this.currentPage,
          this.currentPage + 1,
          '...',
          this.totalPages
        );
      }
    }
    return pages;
  }
}
