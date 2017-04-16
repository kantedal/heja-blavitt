import {Component} from '@angular/core'
import {Platform} from 'ionic-angular'
import {StatusBar} from '@ionic-native/status-bar'
import {SplashScreen} from '@ionic-native/splash-screen'
import {NewsService} from '../services/news.service'
import {NewsPage} from '../pages/news/news'

interface IPage {
  page: any
  title: string
  icon: string
  isSelected: boolean
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = NewsPage
  currentPage: IPage
  pages: IPage[] = [
    {
      page: NewsPage,
      title: 'Nyheter',
      icon: 'ios-paper',
      isSelected: true
    },
    {
      page: NewsPage,
      title: 'Diskussion',
      icon: 'ios-chatbubbles',
      isSelected: false
    },
    {
      page: NewsPage,
      title: 'Inställningar',
      icon: 'ios-settings',
      isSelected: false
    }
  ]

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    newsService: NewsService
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault()
      splashScreen.hide()
    });

    this.currentPage = this.pages[0]
  }

  selectMenuItem(page: IPage) {
    this.currentPage.isSelected = false
    this.currentPage = page
    this.currentPage.isSelected = true
  }
}

