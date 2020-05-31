package com.ilich.controller.book;

import com.ilich.model.Result;
import com.ilich.model.book.Book;
import com.ilich.service.book.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ilich.StringProperties.EXISTS;

@RestController
@RequestMapping("/books")
@CrossOrigin(value = "http://localhost:4200")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public ResponseEntity<List<Book>> getAllBooks() {
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @GetMapping(value = "/{isbn}")
    public ResponseEntity<?> getBookByISBN(@PathVariable long isbn) {
        return ResponseEntity.ok(bookService.getBookByISBN(isbn));
    }

    @PostMapping
    public ResponseEntity<?> addNewBook(@RequestBody Book book) {
        String result = EXISTS;
        Book bookFromDB = bookService.getBookByISBN(book.getIsbn());
        if (bookFromDB == null) {
            result = bookService.addNewBook(book);
        }
        return ResponseEntity.ok(new Result(result));
    }

    @PutMapping
    public ResponseEntity<?> updateBook(@RequestBody Book book) {
        return ResponseEntity.ok(new Result(bookService.updateBook(book)));
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<?> removeBook(@PathVariable long isbn) {
        return ResponseEntity.ok(new Result(bookService.removeBook(isbn)));
    }
}
