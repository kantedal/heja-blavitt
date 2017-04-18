import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as path from 'path'
//routes
import {IndexRoute} from './routes/index'
//interfaces
//models
import {IModel} from './models/model' //import IModel
import {IUserModel} from './models/user' //import IUserModel
//schemas
import {userSchema} from './schemas/user'
import {newsSchema} from './schemas/news'
import {INewsItemModel} from './models/news-item' //import userSchema
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose");
import {NewsFetcher} from './news-fetcher/news-fetcher'
import {Model} from 'mongoose' //import mongoose

export class Server {

  public app: express.Application
  public server: any
  private model: IModel
  private news: Model<INewsItemModel>;

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    //instance defaults
    this.model = {
      user: null,
      newsItem: null
    }

    //create expressjs application
    this.app = express();

    //configure application
    this.config();

    //add routes
    this.routes();

    //add api
    this.api();
  }

  public api() {
    console.log('start api')
    this.server = this.app.listen(8080, "localhost", () => {
      let host = this.server.address().address
      let port = this.server.address().port
      console.log('running at http://' + host + ':' + port)
    })

    let router: express.Router = express.Router();

    router.get('/', (req, res) => {
      res.json({ message: 'hooray! welcome to our api!' });
    });

    router.get('/test', (req, res) => {
      console.log('test')

      // let news = new this..newsItem({
      //   title: 'test test',
      //   content: 'dålig match',
      //   source: 'ab'
      // })
      //
      // news.save().then(result => res.json({ message: result }))
    });

    router.get('/getNews', (req, res) => {
      this.news.find({}, function(err, news) {
        if (err) throw err;
        console.log(news);
        res.json({ news })
      })
    })

    router.get('/getUsers', (req, res) => {
      this.news.find({}, function(err, news) {
        if (err) throw err;
        console.log(news);
        res.json({ news })
      })
    })

    this.app.use('/api', router);
  }

  public config() {
    const MONGODB_CONNECTION: string = "mongodb://localhost:27017/hejablavitt";

    //add static paths
    this.app.use(express.static(path.join(__dirname, "public")));

    //mount logger
    //this.app.use(logger("dev"));

    //mount json form parser
    this.app.use(bodyParser.json());

    //mount query string parser
    this.app.use(bodyParser.urlencoded({
      extended: true
    }));

    //mount cookie parker
    this.app.use(cookieParser("SECRET_GOES_HERE"));

    //mount override
    this.app.use(methodOverride());

    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    this.model.user = connection.model<IUserModel>("User", userSchema);
    //this.model.newsItem = connection.model<INewsItemModel>("NewsItem", newsSchema);

    this.news = connection.model<INewsItemModel>("NewsItem", newsSchema)

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());

    let newsFetcher = new NewsFetcher(this.news)
    newsFetcher.run()
  }

  private routes() {
    let router: express.Router;
    router = express.Router();

    //IndexRoute
    IndexRoute.create(router);

    //use router middleware
    this.app.use(router);
  }

}