package com.learnNshare.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.learnNshare.dto.LoginDto;
import com.learnNshare.dto.UserRegistrationDto;
import com.learnNshare.service.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegistrationDto dto) {

        return userService.registerUser(dto);
    }
    @PostMapping("/login")
    public String loginUser(@RequestBody LoginDto dto) {

        return userService.loginUser(dto);
    }
    
}