import { Injectable } from '@angular/core';
import { Book } from '../models/models';
import { Data, Details } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  consolidateBooks(books: Book[]): Data {
  
    const consolidated:  { [key: string]: Details } = {};
    const totalData: Data = { books: [], filteredData: [] };

    books.forEach((book) => {
      let { id, title, category, subCategory, author, count = 1 } = book;
      const key = `${title}-${subCategory}-${category}-${author}`;

   
      if (!consolidated[key]) {
        console.log(key);
        console.log(consolidated)
        
        totalData?.books.push(book);

        if (book.available) {

          consolidated[key] = { Bookid: [], Quantity: 0 };

          consolidated[key].Bookid.push(id);
          consolidated[key].Quantity += count;

        }
      } else {
        consolidated[key].Bookid.push(id);
        consolidated[key].Quantity += count;
      }
      
    });


    var res = Object.values(consolidated);
    totalData.filteredData = res; 
    return totalData;

  }

  removeDuplicates(books: Book[]): Book[] {
    const uniqueBooks: { [key: string]: Book } = {};

    books.forEach((book) => {
        const { title, author, subCategory, category } = book;
        const key = `${title}-${author}-${subCategory}-${category}`;

        if (!uniqueBooks[key] || !uniqueBooks[key].available) {
            uniqueBooks[key] = book;
        }
    });

    return Object.values(uniqueBooks);
}





}