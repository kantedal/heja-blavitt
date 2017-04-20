import {Injectable} from "@angular/core";
import {Events, ModalController} from "ionic-angular";
import {LoginPage} from "../pages/login/login";


@Injectable()
export class EventService {

  constructor(
    public modalCtrl: ModalController,
    public events: Events
  ) {

  }

}
