import * as express from "express";
import NewsAPI from "./news-api";

export default class API {
  private _server: any
  private _router: express.Router
  private _newsApi: NewsAPI

  constructor(public app: express.Application) {
    this.init()
  }

  private init() {
    //this._server = this.app.listen(3000, '192.168.2.159' , () => { console.log('running at http://' + this._server.address().address + ':' + this._server.address().port) })

    this._router = express.Router();

    this._router.get('/', (req, res) => {
      res.json({ message: 'hooray! welcome to our api!' });
    });

    this._newsApi = new NewsAPI(this._router)


    this.app.use('/api', this._router );
  }
}
