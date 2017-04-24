import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class UserService {
  signedIn: BehaviorSubject<boolean>

  constructor(public http: Http) {
    this.signedIn = new BehaviorSubject(false)
  }

  public signIn(username: string, password: string) {

  }

  public signOut() {

  }

  public register(username: string, password: string, email: string) {
    //let user: IUser = createUser(username, password, email)

  }
}
