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
  }
}