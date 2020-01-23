package com.ilich.service;

import com.ilich.model.User;
import com.ilich.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    private final UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserByUsername(User user) {
        return userRepository.getUserByUsername(user.getUsername());
    }
}
