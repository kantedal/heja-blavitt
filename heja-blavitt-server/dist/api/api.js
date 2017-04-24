"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const news_api_1 = require("./news-api");
class API {
    constructor(app) {
        this.app = app;
        this.init();
    }
    init() {
        this._router = express.Router();
        this._router.get('/', (req, res) => {
            res.json({ message: 'hooray! welcome to our api!' });
        });
        this._newsApi = new news_api_1.default(this._router);
        this.app.use('/api', this._router);
    }
}
exports.default = API;
