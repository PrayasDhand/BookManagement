import { Component } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Grabbit';
  constructor(public api : ApiService){}
  loggedIn(){
    if (this.api.getTokenUserInfo()?.userType === "ADMIN"){
      return true;
    }
    return false;
  
  }
  
}
