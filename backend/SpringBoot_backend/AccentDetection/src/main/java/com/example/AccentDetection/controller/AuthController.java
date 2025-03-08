package com.example.AccentDetection.controller;

import com.example.AccentDetection.JwtAuth.JwtTokenProvider;
import com.example.AccentDetection.dao.RoleRepository;
import com.example.AccentDetection.dto.ResetPasswordRequest;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.AuthService;
import com.example.AccentDetection.service.AuthServiceImpl;
import com.example.AccentDetection.service.UserService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.io.UnsupportedEncodingException;
import java.util.*;

@RestController
@RequestMapping("/api/auth")
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

    @Autowired
    private AuthServiceImpl authServiceImpl;

    @GetMapping("/")
    public String getHello() {
        return "Hello world dd2";
    }

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        try {
            if (userService.loadUserByUsername(user.getEmail()) != null) {
                response.put("status", "error");
                response.put("message", "User already exists.");
                return ResponseEntity.badRequest().body(response);
            }

            // Hash the password and store the user
            String hashedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);

            authService.createUser(user);
            response.put("status", "success");
            response.put("message", "User registered successfully!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            User authenticatedUser = userService.getUserByEmail(authentication.getName())
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            String token = jwtTokenProvider.generateToken(authenticatedUser);
            response.put("status", "success");
            response.put("message", "Login successful!");
            response.put("token", token);
            response.put("enabled",authenticatedUser.isEnabled());
            return ResponseEntity.ok(response);
        }
        catch (BadCredentialsException e) { // Handle Invalid Credentials
            response.put("status", "error");
            response.put("message", "Invalid User!");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
        catch (Exception e) { // Handle Unexpected Errors
            response.put("status", "error");
            response.put("message", "An unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
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

            User user = userService.getUserByEmail(email).orElse(null);

            String sendotp = authService.sendOTP(email);

            if ("User not found".equals(sendotp)) {
                response.put("status", "error");
                response.put("message", "User Not Found !!");
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

    // Reset password
    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, Object>> resetPassword(@RequestBody ResetPasswordRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            boolean isReset = userService.resetPassword(request.getEmail(), request.getNewPassword());
            response.put("status","success");
            response.put("message","Password reset successfully.");
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException ex) {
            response.put("status","Failed");
            response.put("message","User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            response.put("status","Failed");
            response.put("message","Internal Server Error. Please try later !!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    // Verify User (Set Enabled)
    @GetMapping("/verify-user/{verificationCode}")
    public ResponseEntity<Map<String,Object>> verifyUser(@PathVariable("verificationCode") String verificationCode){
        Map<String, Object> response = new HashMap<>();

        try {
            boolean isVerified = userService.verifyUser(verificationCode);
            response.put("status","success");
            response.put("message","User verified successfully.");
            return ResponseEntity.ok(response);
        } catch (UsernameNotFoundException ex) {
            response.put("status","Failed");
            response.put("message","User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            response.put("status","Failed");
            response.put("message","Internal Server Error. Please try later !!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/send_verificationMail")
    public  ResponseEntity<Map<String,Object>> sendMail(@RequestBody Map<String, Object> requestBody){
        Map<String, Object> response = new HashMap<>();
        String email = (String) requestBody.get("email"); // Extract email from JSON

        User user = userService.getUserByEmail(email).orElse(null);
        System.out.println(user.getRoles());
        try {
            authServiceImpl.sendVerificationEmail(user);
        } catch (Exception e) {
           response.put("status","Failed");
           response.put("message","Failed to send mail. Try again later !!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

        response.put("status","success");
        return ResponseEntity.ok(response);
    }
}
