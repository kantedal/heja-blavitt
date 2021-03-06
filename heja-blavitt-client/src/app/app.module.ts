import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicModule} from "ionic-angular";
import { SpinnerModule } from 'angular2-spinner';
import {MyApp} from "./app.component";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {NewsPage} from "../pages/news/news";
import {NewsBoxComponent} from "../components/news-box/news-box";
import {NewsService} from "../services/news.service";
import {MenuItemComponent} from "../components/menu-item/menu-item";
import {HttpModule} from "@angular/http";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {LoginPage} from "../pages/login/login";
import {SideMenuComponent} from "../components/side-menu/side-menu";
import {DateFormatterPipe} from "../pipes/date-formatter.pipe";
import {SettingsPage} from "../pages/settings/settings";
import {DiscussionPage} from "../pages/discussion/discussion";
import {NewsFilterPipe} from "../pipes/news-filter.pipe";
import {ScreenSizeService} from "../services/screen-size.service";
import {SideMenuColorPipe} from "../pipes/side-menu-color.pipe";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    DiscussionPage,
    SettingsPage,
    LoginPage,

    SideMenuComponent,
    NewsBoxComponent,
    MenuItemComponent,

    DateFormatterPipe,
    NewsFilterPipe,
    SideMenuColorPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    SpinnerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    DiscussionPage,
    SettingsPage,
    LoginPage,

    SideMenuComponent,
    NewsBoxComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsService,
    UserService,
    StorageService,
    ScreenSizeService
  ]
})
export class AppModule {}
