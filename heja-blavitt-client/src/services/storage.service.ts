import {Injectable} from "@angular/core";

export const StorageTypes = {
  INITED: 'isInited',
  SESSION_TOKEN: 'sessionToken',
  VOTED_NEWS: 'votedNews',
  DISABLED_NEWS: 'disabledNews'
}

@Injectable()
export class StorageService {
  private _votedNews: { [id: string]: number }
  private _disabledNewsFeeds: { [id: string]: boolean }

  constructor() {
    if (!localStorage.getItem(StorageTypes.INITED)) {
      this.initStorage()
    }
    else {
      this._votedNews = JSON.parse(localStorage.getItem(StorageTypes.VOTED_NEWS))
      this._disabledNewsFeeds = JSON.parse(localStorage.getItem(StorageTypes.DISABLED_NEWS))
    }
  }

  public initStorage() {
    localStorage.setItem(StorageTypes.INITED, JSON.stringify(true))
    this.sessionToken = ''
    this.votedNews = {}
    this.disabledNewsFeeds = {}
  }

  get disabledNewsFeeds() { return this._disabledNewsFeeds }
  set disabledNewsFeeds(newsFeedIds: { [id: string]: boolean } ) {
    localStorage.setItem(StorageTypes.DISABLED_NEWS, JSON.stringify(newsFeedIds))
    this._disabledNewsFeeds = JSON.parse(localStorage.getItem(StorageTypes.DISABLED_NEWS))
  }
  toggleNewsFeed(newsFeedId: string, enabled: boolean) {
    let disabledNewsFeeds = this.disabledNewsFeeds
    if (!enabled && disabledNewsFeeds[newsFeedId] == null) {
      disabledNewsFeeds[newsFeedId] = true
    }
    else if (enabled && disabledNewsFeeds[newsFeedId] != null) {
      delete disabledNewsFeeds[newsFeedId]
    }
    this.disabledNewsFeeds = disabledNewsFeeds
  }


  get votedNews() { return this._votedNews }
  set votedNews(newsIds: { [id: string]: number } ) {
    localStorage.setItem(StorageTypes.VOTED_NEWS, JSON.stringify(newsIds))
    this._votedNews = JSON.parse(localStorage.getItem(StorageTypes.VOTED_NEWS))
  }
  storeVote(newsId: string, vote: number) {
    let votedNews = this.votedNews
    votedNews[newsId] = vote
    this.votedNews = votedNews
  }

  get sessionToken() { return localStorage.getItem(StorageTypes.SESSION_TOKEN) }
  set sessionToken(token: string) { localStorage.setItem(StorageTypes.SESSION_TOKEN, token) }
}
