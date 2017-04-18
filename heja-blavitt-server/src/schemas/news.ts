import { Schema } from "mongoose";
import moment = require('moment')

export const newsSchema: Schema = new Schema({
  createdAt: Number,
  test: Number,
  title: String,
  content: String,
  source: String
});

newsSchema.pre('save', (next) => {
  this.createdAt = moment().valueOf()
  this.test = moment().valueOf()
  console.log('save news',  moment().valueOf(), this.createdAt)

  next();
});

//export class NewsMode