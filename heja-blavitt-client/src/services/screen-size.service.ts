import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable()
export class ScreenSizeService {

  public sizes = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  }

  currentSize: BehaviorSubject<string> = new BehaviorSubject('sm')

  constructor() {
    this.calculateNewSize()
    window.onresize = (e) => this.calculateNewSize()
  }

  private calculateNewSize() {
    for (let size in this.sizes) {
      if (window.innerWidth < this.sizes[size]) {
        if (this.currentSize.getValue() != size) {
          this.currentSize.next(size)
        }
        break
      }
    }
  }

  public isLargerThan(size: string): Observable<boolean> {
    return new Observable(observer => {
      this.currentSize.asObservable().subscribe(newSize => {
        observer.next(this.sizes[newSize] >= this.sizes[size])
      })
    })
  }

  public isSmallerThan(size: string): Observable<boolean> {
    return new Observable(observer => {
      this.currentSize.asObservable().subscribe(newSize => {
        //console.log(this.sizes[newSize] <= this.sizes[size])
        observer.next(this.sizes[newSize] <= this.sizes[size])
      })
    })
  }

}
