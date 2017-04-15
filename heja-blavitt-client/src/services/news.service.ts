import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import NewsItem from '../models/news-item.model'
import {mockNews} from '../models/mock-news'

@Injectable()
export class NewsService {
  private _news: BehaviorSubject<NewsItem[]>

  constructor() {
    this._news = new BehaviorSubject([])
    let mockNewsList = [];
    for (let newsId in mockNews) {
      mockNewsList.push(NewsItem.mapFromJSON(mockNews[newsId]))
    }
    this._news.next(mockNewsList);
  }

  get news(): Observable<NewsItem[]> { return this._news.asObservable() }
}
