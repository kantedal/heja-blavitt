import {Component, Input, OnInit} from '@angular/core';
import * as striptags from 'striptags';
import NewsItem from "../../models/news-item.model";
import {NewsService} from "../../services/news.service";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'news-box',
  templateUrl: 'news-box.html'
})
export class NewsBoxComponent implements OnInit {
  @Input() newsItem: NewsItem
  @Input() newsIndex: number
  //@Input() openNewsItem: (newsItem: NewsItem) => void;

  titleHTML: string
  contentHTML: string
  isEven: boolean = false

  constructor(
    public newsService: NewsService,
    public iab: InAppBrowser
  ) {}

  openNews() {
    const browser = this.iab.create(this.newsItem.url);
    browser.show()
  }

  getBackground() {
    return this.isEven ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)'
  }

  ngOnInit(): void {
    console.log(this.newsItem.currentUserVote)
    this.titleHTML = striptags(this.newsItem.title, '');
    this.contentHTML = striptags(this.newsItem.content, '');
    this.isEven =  this.newsIndex === 0 || !!(this.newsIndex && !(this.newsIndex % 2));
  }
}
