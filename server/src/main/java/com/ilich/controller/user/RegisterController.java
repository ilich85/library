package com.ilich.controller.user;

import com.ilich.model.user.User;
import com.ilich.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import static com.ilich.StringProperties.EXISTS;
import static org.apache.logging.log4j.util.Base64Util.encode;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:4200")
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public String addNewUser(@RequestBody User user) {
        if (userService.getUserByUsername(user.getUsername()) == null) {
            user.setPassword(encode(user.getPassword()));
            user.setRole(user.getRole());
            return userService.addNewUser(user);
        }
        return EXISTS;
    }
}
