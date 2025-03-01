package com.example.AccentDetection.dao;

import com.example.AccentDetection.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Other methods are predefined in JpaRepository

    // Find user by email
    Optional<User> findByEmail(String email);

    // Find user by code
    Optional<User> findByVerificationCode(String verificationcode);
}
