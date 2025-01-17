package com.example.AccentDetection.controller;

import com.example.AccentDetection.JwtAuth.JwtTokenProvider;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class UserController {
    Authentication auth;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public String getHello()
    {
        return "Hello world dd2";
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        // Check if the user already exists
        Optional<User> userExists = userService.getUserByEmail(user.getEmail());

        if (userExists.isPresent()) {
            response.put("status", "error");
            response.put("message", "User with this email already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        // Hash the password and store the user
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        User newUser = new User(user.getEmail(), hashedPassword, List.of("ROLE_USER"));
        userService.saveUser(newUser);

        response.put("status", "success");
        response.put("message", "User registered successfully!");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Perform authentication
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(user.getUsername());

            response.put("status", "success");
            response.put("message", "Login successful!");
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Invalid email or password!");
            return ResponseEntity.status(401).body(response);
        }
    }
}
