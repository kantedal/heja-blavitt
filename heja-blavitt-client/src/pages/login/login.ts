import {Component} from "@angular/core";
import {ViewController} from "ionic-angular";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  showLogin: boolean = true

  constructor(public viewCtrl: ViewController) {}
}
