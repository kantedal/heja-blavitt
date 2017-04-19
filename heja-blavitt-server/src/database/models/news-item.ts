import {Document} from 'mongoose'
import {INewsItem} from "../../interfaces/news-item";

export interface INewsItemModel extends INewsItem, Document {
  //custom methods for your model would be defined here
  // public createNews() {
  //   this.title = 'test test'
  //   let test = new
  //   return new this.save().then(result => {
  //     console.log(result)
  //   });
  // }
}