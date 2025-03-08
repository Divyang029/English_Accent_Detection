package com.example.AccentDetection.controller;

import com.example.AccentDetection.dto.ResetPasswordRequest;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getallUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return user != null ? new ResponseEntity<>(user, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update a user by ID
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return user != null ? new ResponseEntity<>(user, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete user
    @DeleteMapping
    public ResponseEntity<Map<String,Object>> deleteUser(){
        Map<String, Object> response = new HashMap<>();

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        try {
            User user = userService.getUserByEmail(email).orElse(null);

            if(user == null){
                response.put("status","Failed");
                response.put("message","User not found");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            System.out.println(user.getId());
            userService.deleteUser(user.getId());

            response.put("status","success");
            response.put("message","Account deleted successfully !!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status","Failed");
            response.put("message","Failed to delete account. Try again later !!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
