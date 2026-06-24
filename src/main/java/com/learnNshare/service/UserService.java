package com.learnNshare.service;
import com.learnNshare.dto.LoginResponseDto;

import com.learnNshare.security.JwtUtil;
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
    @Autowired
    private JwtUtil jwtUtil;
   
    public java.util.List<User> getAllUsers() {

        return userRepository.findAll();
    }
    public String registerUser(UserRegistrationDto dto) {

        if(userRepository.findByEmail(dto.getEmail()).isPresent()) {
            return "Email Already Exists";
        }

        String role = dto.getRole();

        if("ADMIN".equals(role)) {

            if(!dto.getPassword()
                    .equals("LearnNshare@8124")) {

                return "Invalid Admin Password";
            }
        }
        System.out.println("ROLE RECEIVED = " + dto.getRole());
        User user = new User();

        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setRole(role);

        user.setPassword(
                passwordEncoder.encode(
                        dto.getPassword()
                )
        );

        userRepository.save(user);

        return "User Registered Successfully";
    }
    
    public LoginResponseDto loginUser(LoginDto dto) {

        Optional<User> userOptional =
                userRepository.findByEmail(dto.getEmail());

        if(userOptional.isEmpty()) {
            throw new RuntimeException("User Not Found");
        }

        User user = userOptional.get();

        if(passwordEncoder.matches(
                dto.getPassword(),
                user.getPassword())) {

            String token =
                    jwtUtil.generateToken(
                            user.getEmail(),
                            user.getRole());

            return new LoginResponseDto(
                    token,
                    user.getName(),
                    user.getRole()
            );
        }

        throw new RuntimeException("Invalid Password");
    }
   
}