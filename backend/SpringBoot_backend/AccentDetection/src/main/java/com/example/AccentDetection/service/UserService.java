package com.example.AccentDetection.service;

import com.example.AccentDetection.dto.UserProfileDTO;
import com.example.AccentDetection.entity.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface UserService{

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException ;

    public List<User> getallUser();

    public User saveUser(User user);

    public void deleteUser(Long id);

    public User getUserById(Long id);

    public Optional<User> getUserByEmail(String email);

    User getUserByVerificationCode(String verificationcode);

    boolean verifyUser(String verificationcode);

    boolean resetPassword(String email,String newPassword);

    User updateUser(Long id,User updatedUser);

    UserProfileDTO getUserProfile();

    UserProfileDTO updateUserProfile(String firstName, String lastName, MultipartFile avatar) throws IOException;

}
