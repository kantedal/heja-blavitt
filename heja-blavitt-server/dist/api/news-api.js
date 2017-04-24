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
    }
}
exports.default = NewsAPI;