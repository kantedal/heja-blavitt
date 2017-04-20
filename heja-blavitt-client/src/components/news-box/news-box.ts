import {Component, Input, OnInit} from '@angular/core';
import * as striptags from 'striptags';
import NewsItem from "../../models/news-item.model";
import {NewsService} from "../../services/news.service";

@Component({
  selector: 'news-box',
  templateUrl: 'news-box.html'
})
export class NewsBoxComponent implements OnInit {
  @Input() newsItem: NewsItem
  @Input() newsIndex: number

  titleHTML: string
  contentHTML: string
  isEven: boolean = false

  constructor(public newsService: NewsService) {}

  getBackground() {
    return this.isEven ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)'
  }

  ngOnInit(): void {
    this.titleHTML = striptags(this.newsItem.title, '');
    this.contentHTML = striptags(this.newsItem.content, '');
    this.isEven =  this.newsIndex === 0 || !!(this.newsIndex && !(this.newsIndex % 2));
  }
}
