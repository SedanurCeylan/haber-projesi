export interface NewsArticle {
    article_id?: string;
    title: string;
    description?: string;
    url: string;        // HomeComponent ve CategoryComponent uyumu için url kullanıyoruz
    urlToImage?: string; // slider ve haber kartları için
    content?: string;
    pubDate?: string;
    image_url?: string;
    source_id?: string;
    creator?: string[];
    country?: string[];
    category?: string[];
    language?: string;
    popular?: boolean;   // category filtreleme için opsiyonel
    latest?: boolean;
    trending?: boolean;
  }
  