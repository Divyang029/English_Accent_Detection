package com.example.AccentDetection.service;

import com.example.AccentDetection.entity.User;
import jakarta.mail.MessagingException;
import java.io.UnsupportedEncodingException;


public interface AuthService {
    public void createUser(User user);

    void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException;;

    User verifyUser(String verificationcode);

    String sendOTP(String email) throws MessagingException, UnsupportedEncodingException;
}
