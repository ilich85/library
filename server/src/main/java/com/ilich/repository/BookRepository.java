package com.ilich.repository;

import com.ilich.model.Book;

import java.util.List;
import java.util.Map;
import java.util.Set;


public interface BookRepository {

    void addNewBook(Book book);

    List<Book> getAllBooks();

    Book getBookByISBN(long isbn);

    void saveBookToUsersStore(String username, long isbn);

    void removeBookFromUsersStore(String username, long isbn);

    Map<String, Set<Long>> getBooksByUsers();

    void updateBook(Book book);

    void removeBook(long isbn);

    Set<Long> getBooksAtUser(String username);
}
