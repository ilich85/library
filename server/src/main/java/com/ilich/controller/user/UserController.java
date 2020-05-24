package com.ilich.controller.user;

import com.ilich.model.user.User;
import com.ilich.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:4200")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable String username) {
        return userService.deleteUser(username);
    }
}
