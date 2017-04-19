import { Schema } from "mongoose";
import moment = require('moment')

export let newsSchema: Schema = new Schema({
  newsId: { type: String, unique: true },
  createdAt: Number,
  pubDate: Number,
  title: String,
  content: String,
  source: String,
  url: String,
  imgUrl: String,
  votes: Number,
  comments: []
})

newsSchema.pre('save', function (next) {
  if (!this.createdAt) this.createdAt = moment().valueOf()
  this.updatedAt = moment().valueOf()
  next();
})

newsSchema.pre('findOneAndUpdate', function (next) {
  if (!this.createdAt) this.createdAt = moment().valueOf()
  if (!this.votes) this.votes = 0
  // this.updatedAt = moment().valueOf()
  next();
})