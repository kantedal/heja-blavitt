import {Component, Input, OnInit} from '@angular/core';
import * as striptags from 'striptags';
import NewsItem from "../../models/news-item.model";
import {Pages, IPage} from "../../models/pages";
import {Events} from "ionic-angular";
import {EventTypes} from "../../models/event-types";
import {NewsPage} from "../../pages/news/news";
import {SettingsPage} from "../../pages/settings/settings";

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent implements OnInit {
  pages: IPage[] = Pages

  constructor(
    public events: Events
  ) {}

  selectMenuItem(page: IPage) {
    this.events.publish(EventTypes.CHANGE_PAGE, page)
  }

  openLoginModal() {
    this.events.publish(EventTypes.OPEN_LOGIN_MODAL)
  }

  ngOnInit(): void {}
}
