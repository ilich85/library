package com.ilich.repository;

import com.ilich.model.Book;
import com.ilich.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static com.ilich.StringProperties.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class BookRepositoryImpl implements BookRepository {

    private final MongoTemplate mongoTemplate;

    public BookRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Book> getAllBooks() {
        return mongoTemplate.findAll(Book.class);
    }

    @Override
    public Book getBookByISBN(long isbn) {
        Query query = new Query();
        query.addCriteria(where(ISBN).is(isbn));
        return mongoTemplate.findOne(query, Book.class);
    }

    @Override
    public void saveBookToUsersStore(String username, long isbn) {
        Set<Long> booksAtUserStore = booksAtUserStore(username);
        booksAtUserStore.add(isbn);
        updateUsersStore(booksAtUserStore, username);
    }

    @Override
    public void removeBookFromUsersStore(String username, long isbn) {
        Set<Long> booksAtUserStore = booksAtUserStore(username);
        booksAtUserStore.remove(isbn);
        updateUsersStore(booksAtUserStore, username);
    }

    private Set<Long> booksAtUserStore(String username) {
        Query query = new Query();
        query.addCriteria(where(USERNAME).is(username));
        User user = mongoTemplate.findOne(query, User.class);
        assert user != null;
        return user.getBooksAtUser();
    }

    private void updateUsersStore(Set<Long> booksAtUserStore, String username) {
        Update update = new Update();
        update.set(BOOKS_AT_USER, booksAtUserStore);
        mongoTemplate.updateFirst(query(where(USERNAME).is(username)), update, User.class);
    }

    @Override
    public Map<String, Set<Long>> getBooksByUsers() {
        Map<String, Set<Long>> booksByUsers = new HashMap<>();
        for (User user : mongoTemplate.findAll(User.class)) {
            booksByUsers.put(user.getUsername(), user.getBooksAtUser());
        }
        return booksByUsers;
    }

    @Override
    public Set<Long> getBooksAtUser(String username) {
        Query query = new Query();
        query.addCriteria(where(USERNAME).is(username));
        User user = (User) mongoTemplate.find(query, User.class);
        return user.getBooksAtUser();
    }

    @Override
    public void addNewBook(Book book) {
        mongoTemplate.save(book);
    }

    @Override
    public void updateBook(Book book) {
        Update update = new Update();
        update.set(NAME, book.getName());
        update.set(AUTHORS, book.getAuthors());
        update.set(NUMBER_OF_PAGES, book.getNumberOfPages());
        update.set(YEAR, book.getYear());
        mongoTemplate.updateFirst(query(where(ISBN).is(book.getIsbn())), update, Book.class);
    }

    @Override
    public void removeBook(long isbn) {
        Query query = new Query();
        query.addCriteria(where(ISBN).is(isbn));
        mongoTemplate.remove(query, Book.class);
    }
}
