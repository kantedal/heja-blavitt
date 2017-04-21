import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import {IUserModel} from "./database/models/user"; //import IUserModel
import {userSchema} from "./database/schemas/user";
import {newsSchema} from "./database/schemas/news";
import {INewsItemModel} from "./database/models/news-item"; //import userSchema
import {NewsFetcher} from "./news-fetcher/news-fetcher";
import {Model} from "mongoose"; //import mongoose
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import mongoose = require("mongoose");
import API from "./api/api";


// Database models
export let UserModel: Model<IUserModel>
export let NewsModel: Model<INewsItemModel>

export class Server {
  public app: express.Application
  public api: API

  public static bootstrap(): Server {
    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
    this.api = new API(this.app)
  }

  public config() {
    //const MONGODB_CONNECTION: string = "mongodb://localhost:27017/hejablavitt";
    const MONGODB_CONNECTION: string = "mongodb://admin:gye4QYUiF@ds163940.mlab.com:63940/heja-blavitt";

    this.app.use(express.static(path.join(__dirname, "public")));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    //use q promises
    global.Promise = require("q").Promise;
    mongoose.Promise = global.Promise;

    //connect to mongoose
    let connection: mongoose.Connection = mongoose.createConnection(MONGODB_CONNECTION);

    //create models
    UserModel = connection.model<IUserModel>("User", userSchema);
    NewsModel = connection.model<INewsItemModel>("NewsItem", newsSchema)

    // catch 404 and forward to error handler
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
        err.status = 404;
        next(err);
    });

    //error handling
    this.app.use(errorHandler());

    // Run news fetcher and repeat every 5 minutes
    let newsFetcher = new NewsFetcher()
    setInterval(() => newsFetcher.run(), 1000 * 60 * 5)
  }
}