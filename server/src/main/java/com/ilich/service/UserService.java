package com.ilich.service;

import com.ilich.model.User;
import com.ilich.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.getAllUsers();
    }

    public User getUserByUsername(String username) {
        return userRepository.getUserByUsername(username);
    }

    public void addNewUser(User user) {
        userRepository.addNewUser(user);
    }

    public void deleteUser(String username) {
        userRepository.deleteUser(username);
    }

    public void updatePassword(User user) {
        userRepository.updatePassword(user);
    }
}
