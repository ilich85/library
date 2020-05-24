package com.ilich.service.book;

import com.ilich.model.book.Book;
import com.ilich.repository.book.BookRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public String addNewBook(Book book) {
        return bookRepository.addNewBook(book);
    }

    public String updateBook(Book book) {
        return bookRepository.updateBook(book);
    }

    public String removeBook(long isbn) {
        return bookRepository.removeBook(isbn);
    }
}
