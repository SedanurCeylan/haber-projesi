import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  popular?: boolean;
  latest?: boolean;
  trending?: boolean;
}

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginationComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryPageComponent implements OnInit {
  categories = ['general','business','entertainment','health','science','sports','technology'];
  selectedCategory = '';
  news: NewsArticle[] = [];
  filteredNews: NewsArticle[] = [];
  filters = { popular: false, latest: false, trending: false };

  currentPage = 1;
  pageSize = 20;       
  totalResults = 0;   

  private apiKey = '676f017549224f488970f1835f9db971';
  private baseUrl = 'https://newsapi.org/v2/top-headlines?country=us';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.selectedCategory = params.get('categoryName') || 'general';
      this.fetchCategoryNews();
    });
  }

  fetchCategoryNews(): void {
    const url = `${this.baseUrl}&category=${this.selectedCategory}&pageSize=100&apiKey=${this.apiKey}`;
    this.http.get<any>(url).subscribe(res => {
      this.news = (res.articles || []).map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        urlToImage: a.urlToImage,
        popular: Math.random() > 0.5,
        latest: Math.random() > 0.5,
        trending: Math.random() > 0.5
      }));

      this.totalResults = this.news.length; 
      this.applyFilters();                 
      this.goToPage(1);                     
    });
  }

  goToPage(page: number) {
    if (page < 1) page = 1;
    this.currentPage = page;

    const startIndex = (page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    this.filteredNews = this.news
      .filter(n =>
        (!this.filters.popular || n.popular) &&
        (!this.filters.latest || n.latest) &&
        (!this.filters.trending || n.trending)
      )
      .slice(startIndex, endIndex);
  }

  applyFilters() {
    this.goToPage(1); 
  }

  resetFilters() {
    this.filters = { popular: false, latest: false, trending: false };
    this.goToPage(1);
  }

  changeCategory(cat: string) {
    this.selectedCategory = cat;
    this.fetchCategoryNews();
  }
}
