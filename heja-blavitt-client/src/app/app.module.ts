import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {NewsPage} from "../pages/news/news";
import {NewsBoxComponent} from "../components/news-box/news-box";
import {NewsService} from '../services/news.service'

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    NewsPage,
    HomePage,
    TabsPage,

    NewsBoxComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    NewsPage,
    HomePage,
    TabsPage,

    NewsBoxComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsService
  ]
})
export class AppModule {}
