package com.ilich.repository;

import com.ilich.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ilich.StringProperties.*;
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
    public void addNewUser(User user) {
        mongoTemplate.save(user);
    }

    @Override
    public void deleteUser(String username) {
        Query query = new Query();
        query.addCriteria(Criteria.where(USERNAME).is(username));
        mongoTemplate.remove(query, User.class);
    }

    @Override
    public void updatePassword(User user) {
        mongoTemplate.updateFirst(query(where(USERNAME).is(user.getUsername())),
                update(PASSWORD, user.getPassword()), User.class);
    }
}
