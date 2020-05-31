package com.ilich.controller.user;

import com.ilich.model.Result;
import com.ilich.model.user.ChangePassword;
import com.ilich.model.user.User;
import com.ilich.service.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static com.ilich.StringProperties.FAIL;
import static com.ilich.StringProperties.INCORRECT;

@RestController
@RequestMapping("/password")
@CrossOrigin(value = "http://localhost:4200")
public class PasswordController {

    private final UserService userService;

    public PasswordController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/change")
    public ResponseEntity<?> changePassword(@RequestBody ChangePassword password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userService.getUserByUsername(password.getUsername());
        String result = INCORRECT;
        if (encoder.matches(password.getOldPassword(), user.getPassword())) {
            user.setPassword(encoder.encode(password.getNewPassword()));
            result = userService.changePassword(user);
        }
        return ResponseEntity.ok(new Result(result));
    }

    @PutMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody String username) {
        User user = userService.getUserByUsername(username);
        String result = FAIL;
        if (user != null) {
            result = userService.resetPassword(username);
        }
        return ResponseEntity.ok(new Result(result));
    }
}
