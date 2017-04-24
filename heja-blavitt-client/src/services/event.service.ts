import {Injectable} from "@angular/core";
import {Events, ModalController} from "ionic-angular";


@Injectable()
export class EventService {

  constructor(
    public modalCtrl: ModalController,
    public events: Events
  ) {

  }

}
