import { Schema } from "mongoose";
import moment = require('moment')

export let newsSchema: Schema = new Schema({
  createdAt: Number,
  updatedAt: Number,
  title: String,
  content: String,
  source: String
})

newsSchema.pre('save', function(next) {
  if (!this.createdAt) this.createdAt = moment().valueOf()
  this.updatedAt = moment().valueOf()
  next();
})