package com.ilich.repository.book;

import com.ilich.model.book.Book;

import java.util.List;


public interface BookRepository {

    List<Book> getAllBooks();

    Book getBookByISBN(long isbn);

    String addNewBook(Book book);

    String updateBook(Book book);

    String removeBook(long isbn);
}
