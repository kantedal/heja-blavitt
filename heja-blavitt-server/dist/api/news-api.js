"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../server");
const feeds_1 = require("../news-fetcher/feeds");
class NewsAPI {
    constructor(router) {
        router.get('/getNews', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let limit = parseInt(req.query.fetchCount);
            let skip = parseInt(req.query.skip);
            server_1.NewsModel.find((err, news) => {
                if (err)
                    throw err;
                res.json({ news });
            })
                .sort({ 'pubDate': -1 })
                .limit(limit)
                .skip(skip);
        });
        router.get('/updateNews', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let latestNewsId = req.query.latestNewsId;
            server_1.NewsModel.find((err, news) => {
                if (err)
                    throw err;
                let newNews = [];
                for (let newsItem of news) {
                    console.log(newsItem.newsId, latestNewsId);
                    if (newsItem.newsId == latestNewsId) {
                        break;
                    }
                    else {
                        newNews.push(newsItem);
                    }
                }
                res.json({ news: newNews });
            })
                .sort({ 'pubDate': -1 })
                .limit(5);
        });
        router.get('/getNewsFeeds', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.json({ Feeds: feeds_1.Feeds });
        });
        router.get('/voteNews', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let newsId = req.query.newsId;
            let vote = parseInt(req.query.vote);
            server_1.NewsModel.findOneAndUpdate({ newsId: newsId }, { $inc: { votes: vote } }, { upsert: true }, (error, newsItem) => {
                if (!error) {
                    res.json({ newCount: newsItem.votes + vote });
                }
            });
        });
        router.get('/voteNews', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let newsId = req.query.newsId;
            let vote = parseInt(req.query.vote);
            server_1.NewsModel.findOneAndUpdate({ newsId: newsId }, { $inc: { votes: vote } }, { upsert: true }, (error, newsItem) => {
                if (!error) {
                    res.json({ newCount: newsItem.votes + vote });
                }
            });
        });
        router.get('/incrementViews', (req, res) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            let newsId = req.query.newsId;
            server_1.NewsModel.findOneAndUpdate({ newsId: newsId }, { $inc: { views: 1 } }, { upsert: true }, (error, newsItem) => {
                if (!error) {
                    res.json({ views: newsItem.views + 1 });
                }
            });
        });
    }
}
exports.default = NewsAPI;
