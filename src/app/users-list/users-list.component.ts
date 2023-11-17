import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { ApiService } from '../services/api.service';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  columnsToDisplay: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'created on',
    'action',
  ];

  constructor(private api: ApiService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.api.getAllUsers().subscribe({
      next: (res: User[]) => {
        this.users = [];
        this.users = res;
      },
      error: (err: any) => console.log(err),
    });
  }

  blockUser(user: User) {
    if (user.blocked) {
      this.api.unblockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
      this.api.blockUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.blocked = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }

  enableUser(user: User) {
    if (user.active) {
      this.api.disableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = false;
        },
        error: (err: any) => console.log(err),
      });
    } else {
      this.api.enableUser(user.id).subscribe({
        next: (res: any) => {
          if (res === 'success') user.active = true;
        },
        error: (err: any) => console.log(err),
      });
    }
  }
  showRemind(user:User){
    emailjs.send("service_9xkgk1o","template_fcarwer",{
      reply_to:user.email
      },"rBqK10Mt7xqCSiKQB");
     
      this.showSuccess();
  }

  showSuccess(){
    this.toastr.success('Mail Sent Successfully','Success');
  }

  loggedIn(element: any){
    console.log("here");
    
    if (element?.userType === "ADMIN"){
      return true;
    }
    return false;
  }
}
