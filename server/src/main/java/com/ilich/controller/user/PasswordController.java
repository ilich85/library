package com.ilich.controller.user;

import com.ilich.model.user.ChangePassword;
import com.ilich.model.user.User;
import com.ilich.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import static com.ilich.StringProperties.FAIL;
import static com.ilich.StringProperties.INCORRECT;
import static org.apache.logging.log4j.util.Base64Util.encode;

@RestController
@RequestMapping("/password")
@CrossOrigin(value = "http://localhost:4200")
public class PasswordController {

    private final UserService userService;

    public PasswordController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/change")
    public String changePassword(@RequestBody ChangePassword changePassword) {
        User user = userService.getUserByUsername(changePassword.getUsername());
        if (user.getPassword().equals(encode(changePassword.getOldPassword()))) {
            user.setPassword(encode(changePassword.getNewPassword()));
            return userService.changePassword(user);
        }
        return INCORRECT;
    }

    @PutMapping("/reset")
    public String resetPassword(@RequestBody String username) {
        User user = userService.getUserByUsername(username);
        if (user != null) {
            return userService.resetPassword(username);
        }
        return FAIL;
    }
}
