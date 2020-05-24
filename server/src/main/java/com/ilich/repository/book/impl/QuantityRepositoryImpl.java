package com.ilich.repository.book.impl;

import com.ilich.model.book.Quantity;
import com.ilich.repository.book.QuantityRepository;
import com.mongodb.MongoException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

import static com.ilich.StringProperties.*;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;

@Repository
public class QuantityRepositoryImpl implements QuantityRepository {

    private final MongoTemplate mongoTemplate;

    public QuantityRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Quantity getQuantity(long isbn) {
        Query query = new Query();
        query.addCriteria(where(ISBN).is(isbn));
        return mongoTemplate.findOne(query, Quantity.class);
    }

    @Override
    public String addQuantity(Quantity quantity) {
        try {
            mongoTemplate.save(quantity);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String updateQuantity(Quantity quantity) {
        try {
            Update update = new Update();
            update.set(AMOUNT, quantity.getAmount());
            update.set(AVAILABLE, quantity.getAvailable());
            mongoTemplate.updateFirst(query(where(ISBN).is(quantity.getIsbn())), update, Quantity.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }
}
