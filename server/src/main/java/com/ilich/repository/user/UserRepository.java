package com.ilich.repository.user;

import com.ilich.model.user.User;

import java.util.List;


public interface UserRepository {

    List<User> getAllUsers();

    User getUserByUsername(String username);

    String addNewUser(User user);

    String deleteUser(String username);

    String changePassword(User user);

    String resetPassword(String username);
}
