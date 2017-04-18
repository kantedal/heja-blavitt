import * as moment from 'moment';
import * as request from 'request'
import {Feeds} from './feeds'
import {SearchWords} from './search-words'
import {Model} from 'mongoose'
import {IINewsItemRSSModel} from '../models/news-item'

const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
const API_KEY = '&api_key=omchsk2zbyq4l1cinhzq9dbcta20snqy9yvpguf5';
const API_SETTINGS = '&count=20';

export class NewsFetcher {
  constructor(private news: Model<IINewsItemRSSModel>) {}

  private createNewsItem(newsItemRss: INewsItemRSS) {
    let newsItem = new this.news({

    })
  }

  private allowedNewsSource(INewsItemRSS: INewsItemRSS, feed: Feed): boolean {
    if (INewsItemRSS.title == '' || INewsItemRSS.content == '') return false
    if (INewsItemRSS.title == null || INewsItemRSS.content == null) return false

    if (Feeds[feed.url].directlyAllowed) return true;

    for (let searchWord of SearchWords) {
      if(INewsItemRSS.content.toLowerCase().search(searchWord) != -1 ||
        INewsItemRSS.title.toLowerCase().search(searchWord) != -1 ||
        INewsItemRSS.link.toLowerCase().search(searchWord) != -1) {
        return true;
      }
    }
  }

  public run() {
    for (let feedUrl in Feeds) {
      let req = API_URL + feedUrl + API_KEY + API_SETTINGS;
      request(req, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let data = JSON.parse(body);

          let feed: Feed = data.feed;
          let INewsItemRSSs: Array<INewsItemRSS> = data.items;

          if (INewsItemRSSs != null) {
            for (let INewsItemRSS of INewsItemRSSs) {
              let id = ((INewsItemRSS.title.toLowerCase() + '-' + INewsItemRSS.pubDate).split(' ').join('-')).replace(/\./g,'-').replace(/[\r\n]/g, "-").replace('/', '-');

              if (this.allowedNewsSource(INewsItemRSS, feed)) {
                if (INewsItemRSS.title != <string>"" || INewsItemRSS.title != null || INewsItemRSS.title != <string>" ") {
                  INewsItemRSS.id = id
                  INewsItemRSS.pubDate = moment(INewsItemRSS.pubDate).valueOf()
                  console.log(INewsItemRSS)
                }
              }
            }
          }
        }
      });
    }
  }
}

interface INewsItemRSS {
  id: string
  title: string
  pubDate: string | number
  link: string
  author: string
  thumbnail: string
  description: string
  content: string
  contentSnippet: string
}

interface Feed {
  url: string;
  title: string;
  link: string;
}