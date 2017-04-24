"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const request = require("request");
const feeds_1 = require("./feeds");
const search_words_1 = require("./search-words");
const server_1 = require("../server");
const API_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
const API_KEY = '&api_key=omchsk2zbyq4l1cinhzq9dbcta20snqy9yvpguf5';
const API_SETTINGS = '&count=20';
class NewsFetcher {
    constructor() { }
    createNewsItem(newsItemRss, feed) {
        let update = {
            pubDate: moment(newsItemRss.pubDate).valueOf(),
            title: newsItemRss.title.replace(/&amp;quot;/g, '"'),
            content: newsItemRss.content.replace(/&amp;quot;/g, '"'),
            feedName: feeds_1.Feeds[feed.url].name,
            url: newsItemRss.link,
            imgUrl: newsItemRss.thumbnail ? newsItemRss.thumbnail : null,
            votes: 0,
            comments: []
        };
        server_1.NewsModel.findOneAndUpdate({ newsId: newsItemRss.id }, { $setOnInsert: update }, { upsert: true }, (error, result) => { });
    }
    allowedNewsSource(newsItem, feed) {
        if (newsItem.title == '' || newsItem.content == '')
            return false;
        if (newsItem.title == null || newsItem.content == null)
            return false;
        if (feeds_1.Feeds[feed.url].directlyAllowed)
            return true;
        let strippedContent = newsItem.content.substring(1, 180);
        for (let forbiddenWords of search_words_1.ForbiddenWords) {
            let allowed = false;
            for (let forbiddenWord of forbiddenWords) {
                if (newsItem.title.toLowerCase().search(forbiddenWord) == -1) {
                    allowed = true;
                    break;
                }
            }
            console.log(newsItem.title, allowed);
            if (!allowed) {
                return false;
            }
        }
        for (let searchWord of search_words_1.SearchWords) {
            if (strippedContent.toLowerCase().search(searchWord) != -1 ||
                newsItem.title.toLowerCase().search(searchWord) != -1 ||
                newsItem.link.toLowerCase().search(searchWord) != -1) {
                return true;
            }
        }
    }
    run() {
        for (let feedUrl in feeds_1.Feeds) {
            let req = API_URL + feedUrl + API_KEY + API_SETTINGS;
            request(req, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    let data = JSON.parse(body);
                    let feed = data.feed;
                    let newsItems = data.items;
                    if (newsItems != null) {
                        for (let newsItem of newsItems) {
                            let id = ((newsItem.title.toLowerCase() + '-' + newsItem.pubDate).split(' ').join('-')).replace(/\./g, '-').replace(/[\r\n]/g, "-").replace('/', '-');
                            if (this.allowedNewsSource(newsItem, feed)) {
                                if (newsItem.title != "" || newsItem.title != null || newsItem.title != " ") {
                                    newsItem.id = id;
                                    this.createNewsItem(newsItem, feed);
                                }
                            }
                        }
                    }
                }
            });
        }
    }
}
exports.NewsFetcher = NewsFetcher;
