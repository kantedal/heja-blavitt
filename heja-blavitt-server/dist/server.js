"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const user_1 = require("./database/schemas/user");
const news_1 = require("./database/schemas/news");
const news_fetcher_1 = require("./news-fetcher/news-fetcher");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const api_1 = require("./api/api");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        this.config();
        this.api = new api_1.default(this.app);
    }
    config() {
        const MONGODB_CONNECTION = "mongodb://admin:gye4QYUiF@ds163940.mlab.com:63940/heja-blavitt";
        this.app.use(express.static(path.join(__dirname, "public")));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        global.Promise = require("q").Promise;
        mongoose.Promise = global.Promise;
        let connection = mongoose.createConnection(MONGODB_CONNECTION);
        exports.UserModel = connection.model("User", user_1.userSchema);
        exports.NewsModel = connection.model("NewsItem", news_1.newsSchema);
        this.app.use((err, req, res, next) => {
            err.status = 404;
            next(err);
        });
        this.app.use(errorHandler());
        let newsFetcher = new news_fetcher_1.NewsFetcher();
        newsFetcher.run();
        setInterval(() => newsFetcher.run(), 1000 * 60 * 5);
    }
}
exports.Server = Server;
