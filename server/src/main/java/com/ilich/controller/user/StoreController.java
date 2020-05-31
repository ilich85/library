package com.ilich.controller.user;

import com.ilich.model.Result;
import com.ilich.model.book.Book;
import com.ilich.model.book.Quantity;
import com.ilich.model.user.Store;
import com.ilich.service.book.BookService;
import com.ilich.service.book.QuantityService;
import com.ilich.service.user.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getBooksAtUser(@PathVariable String username) {
        return ResponseEntity.ok(getBooksAtUserStore(username));
    }


    @PostMapping("/{isbn}")
    public ResponseEntity<?> addBookToStore(@PathVariable long isbn, @RequestBody String username) {
        String result = FAIL;
        if (updateQuantity(isbn, true)) {
            result = storeService.addBookToStore(new Store(username, isbn));
        }
        return ResponseEntity.ok(new Result(result));
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<?> removeBookFromStore(@PathVariable long isbn, @RequestBody String username) {
        String result = FAIL;
        if (updateQuantity(isbn, true)) {
            result = storeService.removeBookFromStore(username, isbn);
        }
        return ResponseEntity.ok(new Result(result));
    }

    @PutMapping("/clear")
    public ResponseEntity<?> removeBooksFromStoreBeforeRemoveUser(@RequestBody String username) {
        String result = FAIL;
        for (Book book : getBooksAtUserStore(username)) {
            if (updateQuantity(book.getIsbn(), false)) {
                result = storeService.removeBooksBeforeRemoveUser(username);
            }
        }
        return ResponseEntity.ok(new Result(result));
    }

    private Set<Book> getBooksAtUserStore(String username) {
        Set<Book> booksAtUser = new HashSet<>();
        for (Store store : storeService.getBooksAtUser(username)) {
            booksAtUser.add(bookService.getBookByISBN(store.getIsbn()));
        }
        return booksAtUser;
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
