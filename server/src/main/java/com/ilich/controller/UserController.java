package com.ilich.controller;

import com.ilich.model.User;
import com.ilich.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.ilich.StringProperties.*;
import static org.apache.logging.log4j.util.Base64Util.encode;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{username}")
    @ResponseBody
    public User getUserByUsername(@PathVariable String username) {
        return userService.getUserByUsername(username);
    }

    @PostMapping
    public String addNewUser(@RequestBody User user) {
        if (userService.getUserByUsername(user.getUsername()) == null) {
            user.setPassword(encode(user.getPassword()));
            user.setBooksAtUser(new HashSet<>());
            user.setRole(user.getRole());
            userService.addNewUser(user);
            return SUCCESS;
        }
        return FAIL;
    }

    @PutMapping("/{username}")
    public String updatePassword(@PathVariable String username, @RequestParam String oldPassword,
                                 @RequestParam String newPassword) {
        User user = userService.getUserByUsername(username);
        if (user.getPassword().equals(encode(oldPassword))) {
            user.setPassword(encode(newPassword));
            userService.updatePassword(user);
            return SUCCESS;
        }
        return FAIL;
    }

    @DeleteMapping("/{username}")
    public String deleteUser(@PathVariable String username) {
        userService.deleteUser(username);
        if (userService.getUserByUsername(username) == null) {
            return SUCCESS;
        }
        return FAIL;
    }
}
