import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books = [];

  constructor(private booksService: BooksService, private title: Title) {
  }

  ngOnInit() {
    this.booksService.getAllBooks().subscribe(books => {
      this.books = books.json();
    });
  }

}
