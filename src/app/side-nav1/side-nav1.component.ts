import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'app-side-nav1',
  templateUrl: './side-nav1.component.html',
  styleUrls: ['./side-nav1.component.scss']
})
export class SideNav1Component {
  constructor(public api:ApiService){

    
  }
  loggedIn(){
    return this.api.isLoggedIn();
  }
  sideNavContent: SideNavItem[] = [
    {
      title: 'dashboard',
      link: 'dashboard',
      
    },
    {
      title: 'view books',
      link: 'books/library',
      
    },
    {
      title: 'return book',
      link: 'books/return',
    },
    {
      title: 'my orders',
      link: 'users/order',
    },
  ]
}
