import * as moment from "moment";
import * as request from "request";
import {Feeds} from "./feeds";
import {SearchWords, ForbiddenWords} from "./search-words";
import {NewsModel} from "../server";
import {newsSchema} from "../database/schemas/news";

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
      feedName: Feeds[feed.url].name,
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

  private allowedNewsSource(newsItem: INewsItemRSS, feed: IFeed): boolean {
    if (newsItem.title == '' || newsItem.content == '') return false
    if (newsItem.title == null || newsItem.content == null) return false

    if (Feeds[feed.url].directlyAllowed) return true;

    let strippedContent = newsItem.content.substring(1, 180)

    // Check for forbidden words in article
    for (let forbiddenWords of ForbiddenWords) {
      let allowed = false
      for (let forbiddenWord of forbiddenWords) {
        if(newsItem.title.toLowerCase().search(forbiddenWord) == -1) {
          allowed = true
          break
        }
      }

      console.log(newsItem.title, allowed)
      if (!allowed) {
        return false
      }
    }

    // Check for allowed words in article
    for (let searchWord of SearchWords) {
      if(strippedContent.toLowerCase().search(searchWord) != -1 ||
        newsItem.title.toLowerCase().search(searchWord) != -1 ||
        newsItem.link.toLowerCase().search(searchWord) != -1) {
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