import {Injectable} from '@angular/core'
import {BehaviorSubject, Observable} from 'rxjs'
import NewsItem from '../models/news-item.model'
import {Http, Response, Headers, URLSearchParams, RequestOptions} from "@angular/http";
import {StorageService} from "./storage.service";

export const NEWS_FETCH_COUNT = 15

@Injectable()
export class NewsService {
  private _isFetchingNews: boolean = false
  private _fetchedNews: number = 0
  private _news: BehaviorSubject<NewsItem[]>

  constructor(
    public http: Http,
    public storageService: StorageService
  ) {
    this._news = new BehaviorSubject([])
    this.fetchNews()
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

          let storedNewsVotes = this.storageService.votedNews
          let news: NewsItem[] = this._news.getValue()
          for (let newsJson of body.news) {
            let newsItem = NewsItem.mapFromJSON(newsJson)
            newsItem.currentUserVote = storedNewsVotes[newsItem.newsId] ? storedNewsVotes[newsItem.newsId] : 0
            news.push(newsItem)
          }

          this._news.next(news)

          this._fetchedNews += 15
          this._isFetchingNews = false
        })
    }
  }

  public voteNews(newsItem: NewsItem, vote: number) {
    if (newsItem.currentUserVote == 0) {
      let bodyString = JSON.stringify({ newsId: newsItem.newsId, vote }); // Stringify payload
      let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
      let options = new RequestOptions({ headers: headers });

      this.http.put('http://localhost:8080/api/voteNews', bodyString, options)
        .toPromise()
        .then((res: any) => {
          newsItem.votes = JSON.parse(res._body).newCount
          newsItem.currentUserVote = vote
          this.storageService.storeVote(newsItem.newsId, vote)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  get news(): Observable<NewsItem[]> { return this._news.asObservable() }
  get test(): Observable<NewsItem[]> { return this._news }
}
