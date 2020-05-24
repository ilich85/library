import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})

export class BookComponent implements OnInit {

  @Input()
  private book;
  private isbn;

  ngOnInit() {
    this.isbn = this.book.isbn;
  }
}
