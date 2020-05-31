package com.ilich.controller.user;

import com.ilich.model.Result;
import com.ilich.model.user.User;
import com.ilich.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static com.ilich.StringProperties.EXISTS;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:4200")
public class RegisterController {

    private final UserService userService;

    public RegisterController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<?> addNewUser(@RequestBody User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String result = EXISTS;
        if (userService.getUserByUsername(user.getUsername()) == null) {
            user.setPassword(encoder.encode(user.getPassword()));
            user.setRole(user.getRole());
            result = userService.addNewUser(user);
        }
        return ResponseEntity.ok(new Result(result));
    }
}
