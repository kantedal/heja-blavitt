import { Model } from "mongoose";
import { IUserModel } from "./user";
import {INewsItemModel} from './news-item'

export interface IModel {
  user: Model<IUserModel>;
  newsItem: Model<INewsItemModel>;
}