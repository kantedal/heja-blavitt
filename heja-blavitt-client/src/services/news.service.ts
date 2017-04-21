import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import NewsItem from '../models/news-item.model'
import {Http, Response, Headers, URLSearchParams, RequestOptions} from "@angular/http";

export const NEWS_FETCH_COUNT = 15

@Injectable()
export class NewsService {
  private _isFetchingNews: boolean = false
  private _fetchedNews: number = 0
  private _news: BehaviorSubject<NewsItem[]>

  constructor(public http: Http) {
    this._news = new BehaviorSubject([])
    this.fetchNews()

    this.news.subscribe((news) => {
      console.log(news)
    })
  }

  public fetchNews() {
    if (!this._isFetchingNews) {
      this._isFetchingNews = true

      let params: URLSearchParams = new URLSearchParams();
      params.set('skip', this._fetchedNews.toString());
      params.set('fetchCount', NEWS_FETCH_COUNT.toString());

      this.http.get('http://localhost:8080/api/getNews', { search: params })
        .toPromise()
        .then((res: Response) => {
          let body = res.json()

          let news: NewsItem[] = this._news.getValue()
          for (let newsJson of body.news) {
            news.push(NewsItem.mapFromJSON(newsJson))
          }

          this._news.next(news)

          this._fetchedNews += 15
          this._isFetchingNews = false
        })
    }
  }

  public voteNews(newsItem: NewsItem, vote: number) {
    let bodyString = JSON.stringify({ newsId: newsItem.newsId, vote }); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers });

    this.http.put('http://localhost:8080/api/voteNews', bodyString, options)
      .toPromise()
      .then((res: any) => {
        newsItem.votes = JSON.parse(res._body).newCount
        console.log(JSON.parse(res._body))
        console.log(newsItem)
      })
      .catch(err => {
        console.log(err)
      })
  }

  get news(): Observable<NewsItem[]> { return this._news.asObservable() }
  get test(): Observable<NewsItem[]> { return this._news }
}
