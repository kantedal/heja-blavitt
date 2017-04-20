import {Component} from '@angular/core'
import {NavController, ViewController} from 'ionic-angular'
import NewsItem from '../../models/news-item.model'
import {NewsService} from '../../services/news.service'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  showLogin: boolean = true

  constructor(public viewCtrl: ViewController) {}
}
