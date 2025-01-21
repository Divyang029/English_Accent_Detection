package com.example.AccentDetection.service;

import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.dao.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional
    public List<User> getallUser() {
        return userRepository.findAll();
    }

    @Transactional
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Transactional
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with ID: " + id));
    }

    @Transactional
    public Optional<User> getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    @Transactional
    User getUserByVerificationCode(String verificationcode){
        return userRepository.findByVerificationCode(verificationcode);
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
}
