package com.example.AccentDetection.service;

import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserDetailsService , UserService{

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        try {
            User appUser = userRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("user not found with username  " + username));

            return org.springframework.security.core.userdetails.User.builder().username(appUser.getUsername()).password(appUser.getPassword()).authorities(appUser.getRoles()
                            .stream().map(role -> new SimpleGrantedAuthority(role.getRole())).collect(Collectors.toList()))
                    .build();
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public List<User> getallUser() {
        return userRepository.findAll();
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }


    @Override
    public User getUserByVerificationCode(String verificationcode) {
        return userRepository.findByVerificationCode(verificationcode).orElseThrow(() -> new UsernameNotFoundException("user not found with Code  " + verificationcode));
    }

    @Override
    public boolean verifyUser(String verificationcode) {
        try {
            User user = getUserByVerificationCode(verificationcode);
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
        catch (UsernameNotFoundException e){
            throw e;
        }
        catch (Exception e){
            throw new RuntimeException("An error occurred while verifying the user", e);
        }
    }

    @Override
    public boolean resetPassword(String email, String newPassword) {
        User appUser = userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("user not found with email  " + email));
        String hashedPassword = passwordEncoder.encode(newPassword);

        appUser.setPassword(hashedPassword);
        userRepository.save(appUser);

        return true;
    }

    @Override
    public User updateUser(Long id, User updatedUser) {

        Optional<User> user = userRepository.findById(id);

        return user.orElse(null);
    }

}
