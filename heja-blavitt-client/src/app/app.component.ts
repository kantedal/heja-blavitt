import {Component, AfterViewInit, ViewChild} from "@angular/core";
import {Platform, ModalController, Events, App} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {NewsService} from "../services/news.service";
import {NewsPage} from "../pages/news/news";
import {IPage, Pages} from "../models/pages";
import {EventTypes} from "../models/event-types";
import {LoginPage} from "../pages/login/login";
import {StorageService} from "../services/storage.service";
import {ScreenSizeService} from "../services/screen-size.service";
import {SideMenuComponent} from "../components/side-menu/side-menu";
import {BehaviorSubject} from "rxjs";


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements AfterViewInit {
  rootPage: any = NewsPage
  currentPage: IPage
  sideMenuOpen: BehaviorSubject<boolean> = new BehaviorSubject(false)

  constructor(
    app: App,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    newsService: NewsService,
    public storageService: StorageService,
    public events: Events,
    public modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    })
    this.currentPage = Pages[0]

    this.subscribeToEvents()
  }

  subscribeToEvents() {
    this.events.subscribe(EventTypes.CHANGE_PAGE, (page: IPage) => {
      this.currentPage.isSelected = false
      this.currentPage = page
      this.currentPage.isSelected = true
      this.rootPage = page.page
    })

    this.events.subscribe(EventTypes.OPEN_LOGIN_MODAL, () => {
      let loginModal = this.modalCtrl.create(LoginPage)
      loginModal.present()
    })
  }

  sideMenuOpened() {
    console.log('open')
    this.sideMenuOpen.next(true)
    this.events.publish(EventTypes.SIDE_MENU_OPENED)
  }

  sideMenuClosed() {
    console.log('close')
    this.sideMenuOpen.next(false)
    this.events.publish(EventTypes.SIDE_MENU_CLOSED)
  }

  ngAfterViewInit(): void {
  }
}

