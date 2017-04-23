import { Pipe, PipeTransform } from '@angular/core';
import {StorageService} from "../services/storage.service";
import NewsItem from "../models/news-item.model";

@Pipe({
  name: 'newsFilter',
  pure: false
})
export class NewsFilterPipe implements PipeTransform {
  constructor(public storageService: StorageService) {}

  transform(newsItems: NewsItem[]): any {
    return newsItems.filter(newsItem => this.storageService.disabledNewsFeeds[newsItem.feedName] == null)
  }
}