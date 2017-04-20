import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {IonicApp, IonicModule} from "ionic-angular";
import {MyApp} from "./app.component";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {NewsPage} from "../pages/news/news";
import {NewsBoxComponent} from "../components/news-box/news-box";
import {NewsService} from "../services/news.service";
import {MenuItemComponent} from "../components/menu-item/menu-item";
import {HttpModule} from "@angular/http";
import {UserService} from "../services/user.service";
import {StorageService} from "../services/storage.service";
import {LoginPage} from "../pages/login/login";
import {SideMenuComponent} from "../components/side-menu/side-menu";

@NgModule({
  declarations: [
    MyApp,
    NewsPage,
    LoginPage,

    SideMenuComponent,
    NewsBoxComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NewsPage,
    LoginPage,

    SideMenuComponent,
    NewsBoxComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //{provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsService,
    UserService,
    StorageService
  ]
})
export class AppModule {}
