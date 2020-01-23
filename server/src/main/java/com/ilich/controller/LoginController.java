package com.ilich.controller;

import com.ilich.model.User;
import com.ilich.service.LoginService;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.ilich.StringProperties.*;
import static org.apache.logging.log4j.util.Base64Util.encode;

@RestController
@RequestMapping("/login")
public class LoginController {

    private final LoginService loginService;

    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    @ResponseBody
    public Map<String, String> login(@RequestBody User user) {
        User userFromDB = loginService.getUserByUsername(user);
        Map<String, String> response = new HashMap<>();
        response.put(RESULT, FAIL);
        if (userFromDB != null) {
            if (userFromDB.getPassword().equals(encode(user.getPassword()))) {
                response.put(USERNAME, userFromDB.getUsername());
                response.put(ROLE, userFromDB.getRole().getValue());
                response.put(RESULT, SUCCESS);
            }
        }
        return response;
    }
}
