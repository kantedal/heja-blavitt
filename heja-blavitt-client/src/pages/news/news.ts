import {Component} from '@angular/core'
import {NavController} from 'ionic-angular'
import NewsItem from '../../models/news-item.model'
import {NewsService} from '../../services/news.service'

@Component({
  selector: 'page-news',
  templateUrl: 'news.html'
})
export class NewsPage {
  constructor(
    public navCtrl: NavController,
    public newsService: NewsService
  ) {}

  openNews(newsItem: NewsItem) {
    console.log('open news item');
  }
}
