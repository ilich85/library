package com.ilich.service.user;

import com.ilich.model.user.User;
import com.ilich.repository.user.UserRepository;
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
