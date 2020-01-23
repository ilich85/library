package com.ilich.service;

import com.ilich.model.Book;
import com.ilich.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        return bookRepository.getAllBooks();
    }

    public Book getBookByISBN(long isbn) {
        return bookRepository.getBookByISBN(isbn);
    }

    public void addNewBook(Book book) {
        bookRepository.addNewBook(book);
    }

    public void updateBook(Book book) {
        bookRepository.updateBook(book);
    }

    public void removeBook(long isbn) {
        bookRepository.removeBook(isbn);
    }

    public void saveBookToUsersStore(String username, long isbn) {
        bookRepository.saveBookToUsersStore(username, isbn);
    }

    public void removeBookFromUsersStore(String username, long isbn) {
        bookRepository.removeBookFromUsersStore(username, isbn);
    }

    public Map<String, Set<Long>> getBooksByUsers() {
        return bookRepository.getBooksByUsers();
    }

    public Set<Long> getBooksAtUser(String username) {
        return bookRepository.getBooksAtUser(username);
    }
}
