import {Pipe, PipeTransform} from "@angular/core";
import {StorageService} from "../services/storage.service";

@Pipe({
  name: 'sideMenuColor'
})
export class SideMenuColorPipe implements PipeTransform {
  constructor(public storageService: StorageService) {}

  transform(fullscreen: boolean): any {
    console.log(fullscreen)
    return fullscreen ? 'rgba(10,77,190,0.2)' : 'rgba(10,77,190,0.6)' //fullscreen ? 'rgba(0,0,0,0.2);' : 'rgba(0,0,0,0.6);'
  }
}