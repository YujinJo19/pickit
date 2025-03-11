package com.pickit.controller;

import com.pickit.entity.User;
import com.pickit.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/by-email")
    public Optional<User> getUser(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

}
