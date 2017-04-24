"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const moment = require("moment");
exports.newsSchema = new mongoose_1.Schema({
    newsId: { type: String, unique: true },
    createdAt: Number,
    pubDate: Number,
    title: String,
    content: String,
    feedName: String,
    url: String,
    imgUrl: String,
    votes: Number,
    comments: []
});
exports.newsSchema.pre('save', function (next) {
    if (!this.createdAt)
        this.createdAt = moment().valueOf();
    this.updatedAt = moment().valueOf();
    next();
});
exports.newsSchema.pre('findOneAndUpdate', function (next) {
    if (!this.createdAt)
        this.createdAt = moment().valueOf();
    if (!this.votes)
        this.votes = 0;
    next();
});
