import {Component, ViewChild, AfterViewInit, NgZone} from '@angular/core'
import {NavController, Content} from 'ionic-angular'
import NewsItem from '../../models/news-item.model'
import {NewsService} from '../../services/news.service'

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
    public zone: NgZone
  ) {
    this.news = []
    this.newsService.news.subscribe(news => {
      this.zone.run(() => {
        this.news = news
      })
    })
  }

  openNews(newsItem: NewsItem) {
    console.log('open news item');
  }

  ngAfterViewInit(): void {
    this.content.ionScrollEnd.subscribe(e => {
      if (e.scrollElement.scrollHeight - e.scrollHeight - e.scrollTop < 10) {
        console.log('load some content')
        this.newsService.fetchNews()
      }
    })
  }
}
