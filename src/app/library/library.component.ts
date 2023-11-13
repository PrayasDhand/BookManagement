import { Component, OnInit } from '@angular/core';
import { Book, CategoryBooks } from '../models/models';
import { ApiService } from '../services/api.service';
import { HelperService } from '../services/helper.service';
import { Data } from '@angular/router';

@Component({
  selector: 'library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
})
export class LibraryComponent implements OnInit {
  availableBooks: Book[] = [];
  booksToDisplay: CategoryBooks[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'quantity',
    'order',
  ];

  totalData!: Data; 

  additionalBookDetails!: { Bookid: number[]; Quantity: number; }[];


  constructor(private api: ApiService, private helper: HelperService) {}
  checkAvailability(id: number) {
    for (let i = 0; i < this.additionalBookDetails.length; i++) {
        if (this.additionalBookDetails[i].Bookid.includes(id)) {
            return "Available";
        }
    }
    return "Not Available";
}

getQuantity(id: number) {
  for (let i = 0; i < this.additionalBookDetails.length; i++) {
      if (this.additionalBookDetails[i].Bookid.includes(id)) {
          return this.additionalBookDetails[i].Quantity;
      }
  }
  return 0;
}

  ngOnInit(): void {
   this.getData();
  }
  getData(){this.api.getAllBooks().subscribe({
    next: (res: Book[]) => {
      this.availableBooks = [];
      console.log(res);
      this.totalData = this.helper.consolidateBooks(res);
      this.availableBooks = this.helper.removeDuplicates(this.totalData['books']);
      this.additionalBookDetails = this.totalData['filteredData'];
      console.log(this.availableBooks);
     
      this.updateList();
    },
    error: (err: any) => console.log(err),
  });}
  

  updateList() {
    this.booksToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let categoryBooks of this.booksToDisplay) {
        if (
          book.category === categoryBooks.category &&
          book.subCategory === categoryBooks.subCategory
        )
          exist = true;
      }

      if (exist) {
        for (let categoryBooks of this.booksToDisplay) {
          if (
            book.category === categoryBooks.category &&
            book.subCategory === categoryBooks.subCategory
          )
            categoryBooks.books.push(book);
        }
      } else {
        this.booksToDisplay.push({
          category: book.category,
          subCategory: book.subCategory,
          books: [book],
        });
      }
    }
  }

  getBookCount() {
    return this.booksToDisplay.reduce((pv, cv) => cv.books.length + pv, 0);
  }

  search(value: string) {
    value = value.toLowerCase();
    this.updateList();
    if (value.length > 0) {
      this.booksToDisplay = this.booksToDisplay.filter((categoryBooks) => {
        categoryBooks.books = categoryBooks.books.filter(
          (book) =>
            book.title.toLowerCase().includes(value) ||
            book.author.toLowerCase().includes(value)
        );
        return categoryBooks.books.length > 0;
      });
    }
  }

  orderBook(book: Book) {
    let userid = this.api.getTokenUserInfo()?.id ?? 0;
    this.api.orderBook(userid, book.id).subscribe({
      next: (res: any) => {
        if (res === 'success') {
          book.available = false;
        }
      },
      error: (err: any) => console.log(err),
    });
  }

  isBlocked() {
    let blocked = this.api.getTokenUserInfo()?.blocked ?? true;
    return blocked;
  }
}
