import {Component, ViewChild, AfterViewInit, NgZone} from '@angular/core'
import {NavController, Content} from 'ionic-angular'
import NewsItem from '../../models/news-item.model'
import {NewsService} from '../../services/news.service'
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage implements AfterViewInit {
  @ViewChild(Content) content: any

  news: NewsItem[]

  constructor(
    public navCtrl: NavController,
    public newsService: NewsService,
    public storageService: StorageService,
    public zone: NgZone,
    public iab: InAppBrowser
  ) {
    this.news = []
    this.newsService.news.subscribe(news => {
      this.zone.run(() => this.news = news)
    })
  }

  openNews(newsItem: NewsItem) {
    const browser = this.iab.create(newsItem.url);
    browser.show()
  }

  doRefresh(refresher) {
    this.newsService.updateNews().then(() => refresher.complete())
  }

  ngAfterViewInit(): void {
    this.content.ionScrollEnd.subscribe(e => {
      if (e.scrollElement.scrollHeight - e.scrollHeight - e.scrollTop < 10) {
        this.newsService.fetchNews()
      }
    })
  }
}
