package com.ilich.service.user;

import com.ilich.model.user.User;
import com.ilich.repository.user.UserRepository;
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

    public String addNewUser(User user) {
        return userRepository.addNewUser(user);
    }

    public String deleteUser(String username) {
        return userRepository.deleteUser(username);
    }

    public String changePassword(User user) {
        return userRepository.changePassword(user);
    }

    public String resetPassword(String username) {
        return userRepository.resetPassword(username);
    }
}
