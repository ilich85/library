package com.ilich.repository.book.impl;

import com.ilich.model.book.Book;
import com.ilich.model.book.Quantity;
import com.ilich.model.user.Store;
import com.ilich.repository.book.BookRepository;
import com.mongodb.MongoException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

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
    public String addNewBook(Book book) {
        try {
            mongoTemplate.save(book);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String updateBook(Book book) {
        try {
            Update update = new Update();
            update.set(TITLE, book.getTitle());
            update.set(AUTHORS, book.getAuthors());
            update.set(YEAR, book.getYear());
            mongoTemplate.updateFirst(query(where(ISBN).is(book.getIsbn())), update, Book.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String removeBook(long isbn) {
        try {
            Query query = new Query();
            query.addCriteria(where(ISBN).is(isbn));
            mongoTemplate.remove(query, Book.class);
            mongoTemplate.remove(query, Store.class);
            mongoTemplate.remove(query, Quantity.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }
}
