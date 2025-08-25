export interface NewsArticle {
    article_id?: string;
    title: string;
    description?: string;
    url: string;       
    urlToImage?: string;
    content?: string;
    pubDate?: string;
    image_url?: string;
    source_id?: string;
    creator?: string[];
    country?: string[];
    category?: string[];
    language?: string;
    popular?: boolean;   
    latest?: boolean;
    trending?: boolean;
  }
  