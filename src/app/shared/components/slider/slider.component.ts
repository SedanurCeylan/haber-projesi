import { Component, Input } from '@angular/core';
import { NewsArticle } from '../../../core/models/news.models';


@Component({ selector: 'app-slider', templateUrl: './slider.component.html', styleUrls: ['./slider.component.css'] })
export class SliderComponent {
@Input() items: NewsArticle[] = [];
}