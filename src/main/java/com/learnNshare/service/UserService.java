package com.learnNshare.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import com.learnNshare.dto.LoginDto;
import com.learnNshare.dto.UserRegistrationDto;
import com.learnNshare.entity.User;
import com.learnNshare.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
   
    

    public String registerUser(UserRegistrationDto dto) {

        if(userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email Already Exists";
        }

        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(passwordEncoder.encode(dto.getPassword()));
        user.setRole("STUDENT");

        userRepository.save(user);

        return "User Registered Successfully";
    }
    public String loginUser(LoginDto dto) {

        Optional<User> userOptional =
                userRepository.findByEmail(dto.getEmail());

        if(userOptional.isEmpty()) {
            return "User Not Found";
        }

        User user = userOptional.get();

        if(passwordEncoder.matches(dto.getPassword(),
                user.getPassword())) {

            return "Login Successful";
        }

        return "Invalid Password";
    }
   
}