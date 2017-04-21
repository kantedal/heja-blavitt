import {Component, AfterViewInit} from "@angular/core";
import {NavController} from "ionic-angular";
import {StorageService} from "../../services/storage.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage implements AfterViewInit {

  constructor(
    public navCtrl: NavController,
    public storageService: StorageService
  ) {}

  ngAfterViewInit(): void {}
}
