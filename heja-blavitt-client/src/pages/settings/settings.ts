import {Component, AfterViewInit, OnInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {StorageService} from "../../services/storage.service";
import {NewsService} from "../../services/news.service";
import {INewsFeed} from "../../interfaces/news-source";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements AfterViewInit, OnInit {
  constructor(
    public navCtrl: NavController,
    public storageService: StorageService,
    public newsService: NewsService
  ) {
  }

  newsFeedChecked(event, newsFeed: INewsFeed) {
    this.storageService.toggleNewsFeed(newsFeed.name, event.checked)
  }

  getBackground(index: number) {
    let isEven =  index === 0 || !!(index && !(index % 2));
    return isEven ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.1)'
  }

  ngOnInit(): void {
    this.newsService.getNewsFeeds()
  }

  ngAfterViewInit(): void {
  }
}
