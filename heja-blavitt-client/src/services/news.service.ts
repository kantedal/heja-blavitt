import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import NewsItem from '../models/news-item.model'
import {Http, Response} from "@angular/http";

@Injectable()
export class NewsService {
  private _news: BehaviorSubject<NewsItem[]>

  constructor(public http: Http) {
    this._news = new BehaviorSubject([])

    this.http.get('http://localhost:8080/api/getNews')
      .toPromise()
      .then((res: Response) => {
        let body = res.json()

        let news: NewsItem[] = []
        console.log(body)
        for (let newsJson of body.news) {
          news.push(NewsItem.mapFromJSON(newsJson))
        }

        console.log(news)
        this._news.next(news)
      })
  }

  get news(): Observable<NewsItem[]> { return this._news.asObservable() }
}
