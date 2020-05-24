package com.ilich.repository.user.impl;

import com.ilich.model.user.User;
import com.ilich.repository.user.UserRepository;
import com.mongodb.MongoException;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ilich.StringProperties.*;
import static org.apache.logging.log4j.util.Base64Util.encode;
import static org.springframework.data.mongodb.core.query.Criteria.where;
import static org.springframework.data.mongodb.core.query.Query.query;
import static org.springframework.data.mongodb.core.query.Update.update;


@Repository
public class UserRepositoryImpl implements UserRepository {

    private final MongoTemplate mongoTemplate;

    public UserRepositoryImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<User> getAllUsers() {
        Query query = new Query();
        query.fields().include(USERNAME);
        query.fields().include(ROLE);
        return mongoTemplate.find(query, User.class);
    }

    @Override
    public User getUserByUsername(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where(USERNAME).is(username));
        return mongoTemplate.findOne(query, User.class);
    }

    @Override
    public String addNewUser(User user) {
        try {
            mongoTemplate.save(user);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String deleteUser(String username) {
        try {
            Query query = new Query();
            query.addCriteria(Criteria.where(USERNAME).is(username));
            mongoTemplate.remove(query, User.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String changePassword(User user) {
        try {
            mongoTemplate.updateFirst(query(where(USERNAME).is(user.getUsername())),
                    update(PASSWORD, user.getPassword()), User.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }

    @Override
    public String resetPassword(String username) {
        String encodedDefaultPassword = encode(DEFAULT_PASSWORD);
        try {
            mongoTemplate.updateFirst(query(where(USERNAME).is(username)),
                    update(PASSWORD, encodedDefaultPassword), User.class);
            return SUCCESS;
        } catch (MongoException e) {
            return FAIL;
        }
    }
}
