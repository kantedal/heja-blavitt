import { Pipe, PipeTransform } from '@angular/core';
import {StorageService} from "../services/storage.service";
import NewsItem from "../models/news-item.model";

@Pipe({name: 'newsFilter'})
export class NewsFilterPipe implements PipeTransform {
  constructor(public storageService: StorageService) {

  }

  transform(newsItems: NewsItem[]): any {
    return newsItems.filter((newsItem: NewsItem) => {
      console.log(newsItem)
      return true
    })
  }
}