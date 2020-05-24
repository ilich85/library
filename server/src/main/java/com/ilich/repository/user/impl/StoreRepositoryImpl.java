package com.ilich.repository.user.impl;

import com.ilich.model.user.Store;
import com.ilich.repository.user.StoreRepository;
import com.mongodb.MongoException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static com.ilich.StringProperties.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;

@Repository
public class StoreRepositoryImpl implements StoreRepository {

    private final MongoTemplate mongoTemplate;

    public StoreRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<Store> getBooksAtUser(String username) {
        try {
            Query query = new Query();
            query.addCriteria(where(USERNAME).is(username));
            return mongoTemplate.find(query, Store.class);
        } catch (MongoException e) {
            return new ArrayList<>();
        }
    }

    @Override
    public String addBookToStore(Store store) {
        try {
            mongoTemplate.save(store);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String removeBookFromStore(String username, long isbn) {
        try {
            Query query = new Query();
            query.addCriteria(where(USERNAME).is(username));
            query.addCriteria(where(ISBN).is(isbn));
            mongoTemplate.remove(query, Store.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String removeBooksBeforeRemoveUser(String username) {
        try {
            Query query = new Query();
            query.addCriteria(where(USERNAME).is(username));
            mongoTemplate.remove(query, Store.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }
}
