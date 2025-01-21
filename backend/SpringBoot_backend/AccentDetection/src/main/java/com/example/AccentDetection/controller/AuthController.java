package com.example.AccentDetection.controller;

import com.example.AccentDetection.JwtAuth.JwtTokenProvider;
import com.example.AccentDetection.dao.RoleRepository;
import com.example.AccentDetection.entity.Role;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.AuthService;
import com.example.AccentDetection.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    Authentication auth;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AuthService authService;

    @GetMapping("/")
    public String getHello() {
        return "Hello world dd2";
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (userService.loadUserByUsername(user.getEmail()) != null) {
            response.put("status", "error");
            response.put("message", "User with this email already exists!");
            return ResponseEntity.badRequest().body(response);
        }

        // Hash the password and store the user
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        authService.createUser(user);
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

            SecurityContextHolder.getContext().setAuthentication(authentication);

            // Get the authenticated user
            org.springframework.security.core.userdetails.User authenticatedUser = (org.springframework.security.core.userdetails.User) authentication.getPrincipal();

            // Generate JWT token
            String token = jwtTokenProvider.generateToken(authenticatedUser);

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

    @PostMapping("/sendOTP")
    public ResponseEntity<Map<String, Object>> sendotp(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();

        try {
            // Extract the email from the map
            String email = request.get("email");
            if (email == null || email.isEmpty()) {
                response.put("status", "error");
                response.put("message", "Email is required.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }

            String sendotp = authService.sendOTP(email);

            if ("User not found".equals(sendotp)) {
                response.put("status", "error");
                response.put("message", "Invalid email address.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            } else {
                response.put("status", "success");
                response.put("otp", sendotp);
            }

        } catch (MessagingException | UnsupportedEncodingException e) {
            response.put("status", "error");
            response.put("message", "Failed to send OTP due to server issues. Please try again later.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        return ResponseEntity.ok(response);
    }

}
