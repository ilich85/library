package com.ilich.controller.book;

import com.ilich.model.book.Book;
import com.ilich.service.book.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
@CrossOrigin(value = "http://localhost:4200")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping(value = "/{isbn}")
    public Book getBookByISBN(@PathVariable long isbn) {
        return bookService.getBookByISBN(isbn);
    }

    @PostMapping
    public String addNewBook(@RequestBody Book book) {
        return bookService.addNewBook(book);
    }

    @PutMapping
    public String updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }

    @DeleteMapping("/{isbn}")
    public String removeBook(@PathVariable long isbn) {
        return bookService.removeBook(isbn);
    }
}
