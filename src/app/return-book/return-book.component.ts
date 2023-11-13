import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.scss'],
})
export class ReturnBookComponent  implements OnInit {
  status: string = '';
  bookForm: FormGroup;
  username?: string;
  user!: any;

  constructor(public api: ApiService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      bookId: fb.control('', [Validators.required]),
      userId: fb.control('', [Validators.required]),
    });
  }
  ngOnInit(): void {
    console.log(this.api.getTokenUserInfo());
    this.user = this.api.getTokenUserInfo()
    
   this.username = this.user.firstName;
  }

  returnBook() {
    let book = (this.bookForm.get('bookId') as FormControl).value;
    let user = this.user.id;
    this.api.returnBook(book, user).subscribe({
      next: (res: any) => {
        console.log(res);
        this.status = 'Book Returned!';
        
      },
      error: (err: any) => console.log(err),
    });
  }
}
