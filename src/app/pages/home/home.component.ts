import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: NewsArticle[] = [];
  sliderArticles: NewsArticle[] = [];
  pagedArticles: NewsArticle[] = [];
  loading = true;
  error: string | null = null;

  currentPage = 1;
  pageSize = 20;
  totalResults = 0;   // Toplam sonuç
  currentSlide = 0;
  searchTerm: string = '';

  private apiKey = '676f017549224f488970f1835f9db971';
  private baseUrl = 'https://newsapi.org/v2/top-headlines?country=us';
  private sliderBaseUrl = 'https://newsapi.org/v2/top-headlines?country=us&pageSize=3';

  constructor(private https: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadSliderNews();

    this.route.queryParams.subscribe(params => {
      const category = params['category'] || '';
      const search = params['search'] || '';

      if (search) {
        this.searchTerm = search;
        this.fetchNewsByQuery(search, 1);
      } else if (category) {
        this.fetchNewsByCategory(category, 1);
      } else {
        this.fetchNews(1);
      }
    });
  }

  loadSliderNews() {
    this.https.get(`${this.sliderBaseUrl}&apiKey=${this.apiKey}`).subscribe(
      (res: any) => this.sliderArticles = res.articles || [],
      () => console.error('Slider haberleri yüklenemedi')
    );
  }

  fetchNews(page: number = 1) {
    this.loading = true;
    this.error = null;
    const url = `${this.baseUrl}&pageSize=${this.pageSize}&page=${page}&apiKey=${this.apiKey}`;
    this.https.get<any>(url).subscribe(
      res => this.handleResponse(res, page),
      () => { this.error = 'Haberler yüklenemedi'; this.loading = false; }
    );
  }

  fetchNewsByCategory(category: string, page: number = 1) {
    this.loading = true;
    this.error = null;
    const url = `${this.baseUrl}&category=${category}&pageSize=${this.pageSize}&page=${page}&apiKey=${this.apiKey}`;
    this.https.get<any>(url).subscribe(
      res => this.handleResponse(res, page),
      () => { this.error = 'Haberler yüklenemedi'; this.loading = false; }
    );
  }

  fetchNewsByQuery(query: string, page: number = 1) {
    this.loading = true;
    this.error = null;
    const url = `https://newsapi.org/v2/everything?qInTitle=${query}&pageSize=${this.pageSize}&page=${page}&apiKey=${this.apiKey}`;
    this.https.get<any>(url).subscribe(
      res => this.handleResponse(res, page, query),
      () => { this.error = 'Haberler yüklenemedi'; this.loading = false; }
    );
  }

  handleResponse(res: any, page: number, query?: string) {
    this.articles = res.articles || [];
    this.totalResults = res.totalResults || this.articles.length;
    this.pagedArticles = [...this.articles];
    this.currentPage = page;
    this.loading = false;

    if (query && !this.articles.length) {
      this.error = 'Aradığınız kelime ile ilgili haber bulunamadı.';
    }
  }

  goToPage(page: number) {
    if (page < 1 || page > Math.ceil(this.totalResults / this.pageSize)) return;

    const term = this.searchTerm.trim();
    if (term) {
      this.fetchNewsByQuery(term, page);
    } else {
      this.fetchNews(page);
    }
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.sliderArticles.length) % this.sliderArticles.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.sliderArticles.length;
  }
}
