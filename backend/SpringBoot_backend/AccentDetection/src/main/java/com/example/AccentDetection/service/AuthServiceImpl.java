package com.example.AccentDetection.service;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.example.AccentDetection.dao.RoleRepository;
import com.example.AccentDetection.entity.Role;
import com.example.AccentDetection.entity.User;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.core.env.Environment;

import java.io.UnsupportedEncodingException;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Service
public class AuthServiceImpl implements AuthService{
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private Environment env;

    @Override
    public void createUser(User user) {
        try{
            Set<Role> roles = new HashSet<>();

            Role role = roleRepository.findByRole("ROLE_USER").get();
            roles.add(role);

            user.setRoles(roles);

            String verificationCode = UUID.randomUUID().toString();

            System.out.println("Verification code is : " + verificationCode);
            user.setVerificationCode(verificationCode);
            user.setEnabled(false);
            userService.saveUser(user);
            sendVerificationEmail(user);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void sendVerificationEmail(User user) throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = env.getProperty("YOUR_EMAIL");
        String senderName = "Accent Detection Service";
        String subject = "Please verify your registration";
        String content = "<!DOCTYPE html>" +
                "<html>" +
                "<head>" +
                "<style>" +
                "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }" +
                ".email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; }" +
                ".email-header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; }" +
                ".email-body { padding: 20px; line-height: 1.6; color: #333333; }" +
                ".email-body p { margin: 10px 0; }" +
                ".button { background-color: #4CAF50; color: white; padding: 12px 25px; font-size: 15px; border-radius: 5px; text-align: center; display: inline-block; font-weight: bold; }" +
                ".email-footer { text-align: center; padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 14px; }" +
                ".email-footer a { color: #007bff; text-decoration: none; }" +
                "</style>" +
                "</head>" +
                "<body>" +
                "<div class='email-container'>" +
                "<div class='email-header'>Accent Detection Service</div>" +
                "<div class='email-body'>" +
                "<p>Hello <strong>[[name]]</strong>,</p>" +
                "<p>Thank you for registering with Accent Detection Service. Please click the link below to verify your registration:</p>" +
                "<p><a href=\"[[URL]]\" target=\"_self\" class=\"button\">VERIFY</a></p>" +
                "<p>If you did not register, please ignore this email.</p>" +
                "<p>Thank you,<br>Accent Detection Service Team</p>" +
                "</div>" +
                "<div class='email-footer'>" +
                "<p>&copy; 2025 Accent Detection Service. All rights reserved.</p>" +
                "<p><a href=\"[[WEB_URL]]\">Visit our website</a></p>" +
                "</div>" +
                "</div>" +
                "</body>" +
                "</html>";


        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFirstName());
        String verifyURL = env.getProperty("FRONTEND_URL") + "/verify?code=" + user.getVerificationCode();
        content = content.replace("[[URL]]", verifyURL);
        content = content.replace("[[WEB_URL]]",env.getProperty("FRONTEND_URL"));
        helper.setText(content, true);

        mailSender.send(message);
    }

    @Override
    public User verifyUser(String verificationcode) {
        User user = userService.getUserByVerificationCode(verificationcode);

        if(user != null){
            user.setEnabled(true);
        }

        userService.saveUser(user);

        return user;
    }

    @Override
    public String sendOTP(String email) throws MessagingException, UnsupportedEncodingException {
        Optional<User> isuser = userService.getUserByEmail(email);
        if (isuser.isPresent()) {
            String otp = String.format("%06d", new java.util.Random().nextInt(1000000));

            User user = isuser.get();

            String toAddress = user.getEmail();
            String fromAddress = env.getProperty("YOUR_EMAIL");
            String senderName = "Accent Detection Service";
            String subject = "Password Reset Request";


            String content = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }" +
                    ".email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); overflow: hidden; }" +
                    ".email-header { background-color: #007bff; color: #ffffff; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; }" +
                    ".email-body { padding: 20px; line-height: 1.6; color: #333333; }" +
                    ".email-body p { margin: 10px 0; }" +
                    ".otp-code { display: inline-block; background-color: #f8f9fa; color: #007bff; font-weight: bold; padding: 10px 15px; border: 1px dashed #007bff; border-radius: 5px; font-size: 18px; margin: 20px 0; }" +
                    ".email-footer { text-align: center; padding: 20px; background-color: #f4f4f4; color: #666666; font-size: 14px; }" +
                    ".email-footer a { color: #007bff; text-decoration: none; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='email-container'>" +
                    "<div class='email-header'>Accent Detection Service</div>" +
                    "<div class='email-body'>" +
                    "<p>Hello <strong>[[name]]</strong>,</p>" +
                    "<p>We received a request to reset your password. Please use the following One-Time Password (OTP) to proceed with the password reset:</p>" +
                    "<div class='otp-code'>[[OTP_CODE]]</div>" +
                    "<p>If you did not request a password reset, please ignore this email.</p>" +
                    "<p>Thank you,<br>Accent Detection Service Team</p>" +
                    "</div>" +
                    "<div class='email-footer'>" +
                    "<p>&copy; 2025 Accent Detection Service. All rights reserved.</p>" +
                    "<p><a href=\"[[URL]]\">Visit our website</a></p>" +
                    "</div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);

            content = content.replace("[[name]]", user.getFirstName());
            content = content.replace("[[OTP_CODE]]", otp);
            content = content.replace("[[URL]]",env.getProperty("FRONTEND_URL"));

            helper.setText(content, true);

            mailSender.send(message);


            return otp;
        } else {
            return "User not found";
        }
    }

}
