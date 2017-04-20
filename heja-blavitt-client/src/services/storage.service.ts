import {Injectable} from "@angular/core";

export const StorageTypes = {
  INITED: 'isInited',
  SESSION_TOKEN: 'sessionToken',
  VOTED_NEWS: 'votedNews'
}

@Injectable()
export class StorageService {
  constructor() {
    if (!localStorage.getItem(StorageTypes.INITED)) {
      this.initStorage()
    }
  }

  public initStorage() {
    localStorage.setItem(StorageTypes.INITED, JSON.stringify(true))
    this.sessionToken = ''
    this.votedNews = {}
  }

  get votedNews() { return JSON.parse(localStorage.getItem('votedNews')) }
  set votedNews(newsIds: { [id: string]: number } ) { localStorage.setItem(StorageTypes.VOTED_NEWS, JSON.stringify(newsIds)) }
  storeVote(newsId: string, vote: number) {
    let votedNews = this.votedNews
    votedNews[newsId] = vote
    this.votedNews = votedNews
  }

  get sessionToken() { return localStorage.getItem(StorageTypes.SESSION_TOKEN) }
  set sessionToken(token: string) { localStorage.setItem(StorageTypes.SESSION_TOKEN, token) }
}
