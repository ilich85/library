package com.ilich.controller.user;

import com.ilich.model.book.Book;
import com.ilich.model.book.Quantity;
import com.ilich.model.user.Store;
import com.ilich.service.book.BookService;
import com.ilich.service.book.QuantityService;
import com.ilich.service.user.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

import static com.ilich.StringProperties.FAIL;
import static com.ilich.StringProperties.SUCCESS;

@RestController
@RequestMapping("/store")
@CrossOrigin(value = "http://localhost:4200")
public class StoreController {

    private final StoreService storeService;
    @Autowired
    private QuantityService quantityService;
    @Autowired
    private BookService bookService;

    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping("/{username}")
    public Set<Book> getBooksAtUser(@PathVariable String username) {
        Set<Book> booksAtUser = new HashSet<>();
        for (Store store : storeService.getBooksAtUser(username)) {
            booksAtUser.add(bookService.getBookByISBN(store.getIsbn()));
        }
        return booksAtUser;
    }

    @PostMapping("/{isbn}")
    public String addBookToStore(@PathVariable long isbn, @RequestBody String username) {
        if (updateQuantity(isbn, true)) {
            return storeService.addBookToStore(new Store(username, isbn));
        }
        return FAIL;
    }

    @PutMapping("/{isbn}")
    public String removeBookFromStore(@PathVariable long isbn, @RequestBody String username) {
        if (updateQuantity(isbn, false)) {
            return storeService.removeBookFromStore(username, isbn);
        }
        return FAIL;
    }

    @PutMapping("/clear")
    public String removeBooksFromStoreBeforeRemoveUser(@RequestBody String username) {
        for (Book book : getBooksAtUser(username)) {
            if (!updateQuantity(book.getIsbn(), false)) {
                return FAIL;
            }
        }
        return storeService.removeBooksBeforeRemoveUser(username);
    }

    private boolean updateQuantity(long isbn, boolean isAddingToStore) {
        Quantity quantity = quantityService.getQuantity(isbn);
        if (isAddingToStore) {
            quantity.setAvailable(quantity.getAvailable() - 1);
        } else {
            quantity.setAvailable(quantity.getAvailable() + 1);
        }
        return quantityService.updateQuantity(quantity).equals(SUCCESS);
    }
}
