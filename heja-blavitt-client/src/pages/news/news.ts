import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {NewsItem} from "../../models/news-item.model";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  news: NewsItem[] = [
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
    { url: '', content: '"Bra insats av grabbarna"', pubDate: 0, title: 'Blåvitt vann med 15-0', source: '' },
  ]

  constructor(public navCtrl: NavController) {}

  openNews(newsItem: NewsItem) {
    console.log('open news item');
  }
}