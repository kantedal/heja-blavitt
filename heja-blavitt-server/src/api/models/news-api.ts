import * as express from "express";
import {NewsModel} from "../../server";

export default class NewsAPI {
  constructor(router: express.Router) {

    /*
      Fetch news call
     */
    router.get('/getNews', (req, res) => {
      NewsModel.find((err, news) => {
        if (err) throw err;
        res.json({ news })
      })
      .sort({'pubDate': -1})
    })

    /*
     Vote news call
     */
    router.put('/voteNews', (req, res) => {
      let newsId = req.body.newsId
      let vote = parseInt(req.body.vote)

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