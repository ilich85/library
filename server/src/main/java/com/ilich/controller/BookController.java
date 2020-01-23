package com.ilich.controller;

import com.ilich.model.Book;
import com.ilich.service.BookService;
import com.ilich.util.BookFileLoader;
import com.ilich.util.BookPictureLoader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.ilich.StringProperties.*;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    @Autowired
    private BookFileLoader bookFileLoader;
    @Autowired
    private BookPictureLoader bookPictureLoader;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{isbn}")
    public Book getBookByISBN(@PathVariable long isbn) {
        return bookService.getBookByISBN(isbn);
    }

    @GetMapping("/picture/{isbn}")
    public byte[] getPicture(@PathVariable long isbn) {
        return bookPictureLoader.getPicture(isbn);
    }

    @GetMapping("/{isbn}/read")
    public byte[] readBook(@PathVariable long isbn) {
        return bookFileLoader.getFile(isbn);
    }

    @PostMapping
    public String addNewBook(@RequestBody Book book, MultipartFile picture, MultipartFile file) {
        String result = bookFileLoader.saveFile(file, book.getIsbn());
        if (result.equals(SUCCESS)) {
            result = bookPictureLoader.savePicture(picture, book.getIsbn());
            if (result.equals(SUCCESS)) {
                bookService.addNewBook(book);
                return SUCCESS;
            }
        }
        return FAIL;
    }

    @PutMapping("/{isbn}")
    public String updateBook(@RequestBody Book book) {
        bookService.updateBook(book);
        return SUCCESS;
    }

    @DeleteMapping("/{isbn}")
    public String removeBook(@PathVariable long isbn) {
        bookFileLoader.removeFile(isbn);
        bookService.removeBook(isbn);
        return SUCCESS;
    }

    @PostMapping("/{isbn}/store_add")
    public String saveBookToUsersStore(@PathVariable long isbn, @RequestParam String username) {
        bookService.saveBookToUsersStore(username, isbn);
        return SUCCESS;
    }

    @PostMapping("/{isbn}/store_remove")
    public String removeBookFromUsersStore(@PathVariable long isbn, @RequestParam String username) {
        bookService.removeBookFromUsersStore(username, isbn);
        return SUCCESS;
    }

    @GetMapping("/by_users")
    public Map<String, Set<Long>> getBooksByUsers() {
        return bookService.getBooksByUsers();
    }

    @GetMapping("/at_user/{username}")
    public Set<Long> getBooksAtUser(@PathVariable String username) {
        return bookService.getBooksAtUser(username);
    }
}
