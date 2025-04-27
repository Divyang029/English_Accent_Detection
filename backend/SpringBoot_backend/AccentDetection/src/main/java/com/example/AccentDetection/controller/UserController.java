package com.example.AccentDetection.controller;

import com.example.AccentDetection.dto.ResetPasswordRequest;
import com.example.AccentDetection.dto.UserProfileDTO;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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

    @GetMapping("/profile")
    public ResponseEntity<UserProfileDTO> getUserProfile(Authentication authentication) {
        UserProfileDTO profile = userService.getUserProfile();
        return ResponseEntity.ok(profile);
    }

    @PutMapping(value = "/profile", consumes = {"multipart/form-data"})
    public ResponseEntity<UserProfileDTO> updateUserProfile(
            @RequestParam(value = "firstName", required = false) String firstName,
            @RequestParam(value = "lastName", required = false) String lastName,
            @RequestParam(value = "avatar", required = false) MultipartFile avatar) {

        UserProfileDTO updatedProfile = null;
        try {
            updatedProfile = userService.updateUserProfile(firstName, lastName, avatar);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

        return ResponseEntity.ok(updatedProfile);
    }
}
