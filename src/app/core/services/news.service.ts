import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'bcc4e58a26984769914af977359e5452'; 
  private apiUrl = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${this.apiKey}`;

  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
