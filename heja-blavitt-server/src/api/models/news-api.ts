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
    router.post('/voteNews', (req, res) => {
      console.log(req.query)
      res.json(req.query)
    })
  }
}