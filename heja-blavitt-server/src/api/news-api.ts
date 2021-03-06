import * as express from "express";
import {NewsModel} from "../server";
import {Feeds} from "../news-fetcher/feeds";

export default class NewsAPI {
  constructor(router: express.Router) {

    /*
      Fetch news
     */
    router.get('/getNews', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      let limit = parseInt(req.query.fetchCount)
      let skip = parseInt(req.query.skip)

      NewsModel.find((err, news) => {
        if (err) throw err;
        res.json({ news })
      })
      .sort({'pubDate': -1})
      .limit(limit)
      .skip(skip)
    })

    /*
     Update news feed
     */
    router.get('/updateNews', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      let latestNewsId = req.query.latestNewsId

      NewsModel.find((err, news) => {
        if (err) throw err;

        let newNews = []
        for (let newsItem of news) {
          console.log(newsItem.newsId, latestNewsId)
          if (newsItem.newsId == latestNewsId) {
            break
          }
          else {
            newNews.push(newsItem)
          }
        }

        res.json({ news: newNews })
      })
      .sort({'pubDate': -1})
      .limit(5)
    })

    /*
     Fetch news feeds
     */
    router.get('/getNewsFeeds', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.json({ Feeds })
    })

    /*
     Vote news call
     */
    router.get('/voteNews', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      let newsId = req.query.newsId
      let vote = parseInt(req.query.vote)

      NewsModel.findOneAndUpdate(
        { newsId: newsId },
        { $inc : { votes: vote } },
        { upsert : true },
        (error, newsItem) => {
          if (!error) {
            res.json({ newCount: newsItem.votes + vote })
          }
        }
      )
    })

    /*
     Vote news call
     */
    router.get('/voteNews', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')

      let newsId = req.query.newsId
      let vote = parseInt(req.query.vote)

      NewsModel.findOneAndUpdate(
        { newsId: newsId },
        { $inc : { votes: vote } },
        { upsert : true },
        (error, newsItem) => {
          if (!error) {
            res.json({ newCount: newsItem.votes + vote })
          }
        }
      )
    })

    /*
     Vote news call
     */
    router.get('/incrementViews', (req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      let newsId = req.query.newsId

      NewsModel.findOneAndUpdate(
        { newsId: newsId },
        { $inc : { views: 1 } },
        { upsert : true },
        (error, newsItem) => {
          if (!error) {
            res.json({ views: newsItem.views + 1 })
          }
        }
      )
    })
  }
}