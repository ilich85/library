package com.ilich.repository;

import com.ilich.model.User;

import java.util.List;


public interface UserRepository {

    List<User> getAllUsers();

    User getUserByUsername(String username);

    void addNewUser(User user);

    void deleteUser(String username);

    void updatePassword(User user);
}
