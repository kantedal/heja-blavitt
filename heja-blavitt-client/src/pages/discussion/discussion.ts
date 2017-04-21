import {Component, AfterViewInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'page-discussion',
  templateUrl: 'discussion.html'
})
export class DiscussionPage implements AfterViewInit {

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService
  ) {}

  ngAfterViewInit(): void {}
}
