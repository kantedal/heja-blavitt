import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import NewsItem from "../models/news-item.model";
import {Http, Response, URLSearchParams} from "@angular/http";
import {StorageService} from "./storage.service";
import {INewsFeed} from "../interfaces/news-source";
import {SERVER_ADDRESS} from "../config";

export const NEWS_FETCH_COUNT = 15

@Injectable()
export class NewsService {
  private _isFetchingNews: boolean = false
  private _fetchedNews: number = 0
  private _news: BehaviorSubject<NewsItem[]>

  newsFeeds: BehaviorSubject<INewsFeed[]> = new BehaviorSubject([])
  newsFeedsLoading: boolean = false

  constructor(
    public http: Http,
    public storageService: StorageService
  ) {
    this._news = new BehaviorSubject([])
    this.fetchNews()
  }

  public getNewsFeeds(): Promise<any> {
    this.newsFeedsLoading = true
    return this.http.get(SERVER_ADDRESS + 'api/getNewsFeeds')
    .toPromise()
    .then((res: Response) => {
      let body = res.json()

      let feeds: INewsFeed[] = []
      for (let feedId in body.Feeds) {
        let feed = body.Feeds[feedId]
        feeds.push({
          name: feed.name,
          id: feedId
        })
      }

      this.newsFeeds.next(feeds)
      this.newsFeedsLoading = false
    })
  }

  public fetchNews() {
    if (!this._isFetchingNews) {
      this._isFetchingNews = true

      let params: URLSearchParams = new URLSearchParams()
      params.set('skip', this._fetchedNews.toString())
      params.set('fetchCount', NEWS_FETCH_COUNT.toString())

      this.http.get(SERVER_ADDRESS + 'api/getNews', { search: params })
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
    console.log('test test')
    if (newsItem.currentUserVote == 0) {
      let params: URLSearchParams = new URLSearchParams()
      params.set('vote', vote.toString())
      params.set('newsId', newsItem.newsId)

      this.http.get(SERVER_ADDRESS + 'api/voteNews', { search: params })
        .toPromise()
        .then((res: any) => {
          let body = res.json()

          newsItem.votes = body.newCount
          newsItem.currentUserVote = vote
          this.storageService.storeVote(newsItem.newsId, vote)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  get news(): Observable<NewsItem[]> { return this._news.asObservable() }
}
