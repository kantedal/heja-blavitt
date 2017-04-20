import * as moment from 'moment';
import * as request from 'request'
import {Feeds} from './feeds'
import {SearchWords} from './search-words'
import {Model} from 'mongoose'
import {INewsItemModel} from "../database/models/news-item";
import {NewsModel} from "../server";

const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
const API_KEY = '&api_key=omchsk2zbyq4l1cinhzq9dbcta20snqy9yvpguf5';
const API_SETTINGS = '&count=20';

export class NewsFetcher {
  constructor() {}

  private createNewsItem(newsItemRss: INewsItemRSS, feed: IFeed) {
    let update = {
      pubDate: moment(newsItemRss.pubDate).valueOf(),
      title: newsItemRss.title.replace(/&amp;quot;/g, '"'),
      content: newsItemRss.content.replace(/&amp;quot;/g, '"'),
      source: Feeds[feed.url].name,
      url: newsItemRss.link,
      imgUrl: newsItemRss.thumbnail ? newsItemRss.thumbnail : null,
      votes: 0,
      comments: []
    }

    NewsModel.findOneAndUpdate(
      { newsId: newsItemRss.id },
      { $setOnInsert: update },
      { upsert: true },
      (error, result) => {}
    )
  }

  private allowedNewsSource(INewsItemRSS: INewsItemRSS, feed: IFeed): boolean {
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
      let req = API_URL + feedUrl + API_KEY + API_SETTINGS
      request(req, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          let data = JSON.parse(body)

          let feed: IFeed = data.feed
          let newsItems: INewsItemRSS[] = data.items

          if (newsItems != null) {
            for (let newsItem of newsItems) {
              let id = ((newsItem.title.toLowerCase() + '-' + newsItem.pubDate).split(' ').join('-')).replace(/\./g,'-').replace(/[\r\n]/g, "-").replace('/', '-')

              if (this.allowedNewsSource(newsItem, feed)) {
                if (newsItem.title != <string>"" || newsItem.title != null || newsItem.title != <string>" ") {
                  newsItem.id = id
                  this.createNewsItem(newsItem, feed)
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
  enclosure: {
    link: string
    type: string
    length: number
  }
  content: string
  contentSnippet: string
}

interface IFeed {
  url: string;
  title: string;
  link: string;
}