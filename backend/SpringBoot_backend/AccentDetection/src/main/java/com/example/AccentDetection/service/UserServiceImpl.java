package com.example.AccentDetection.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.example.AccentDetection.dto.UserProfileDTO;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.dao.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
public class UserServiceImpl implements UserDetailsService , UserService{

    private final UserRepository userRepository;

    private PasswordEncoder passwordEncoder;

    @Autowired
    private Environment env;
    private BlobServiceClient blobServiceClient;
    @PostConstruct
    public void init(){
        blobServiceClient = new BlobServiceClientBuilder()
                .connectionString(env.getProperty("AZURE_BLOB_CONN_STRING"))
                .buildClient();
    }

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

    @Override
    public UserProfileDTO getUserProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        return mapUserToDTO(user);
    }

    @Override
    public UserProfileDTO updateUserProfile(String firstName, String lastName, MultipartFile avatarFile) throws IOException{
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        boolean hasChanges = false;

        if (firstName != null && !firstName.trim().isEmpty()) {
            user.setFirstName(firstName.trim());
            hasChanges = true;
        }

        if (lastName != null && !lastName.trim().isEmpty()) {
            user.setLastName(lastName.trim());
            hasChanges = true;
        }

        if (avatarFile != null && !avatarFile.isEmpty()) {
            String avatarUrl = saveImageFile(user.getId(),user.getPhotoPath(),avatarFile);
            user.setPhotoPath(avatarUrl);
            hasChanges = true;
        }

        // Only save if there were changes
        if (hasChanges) {
            user = userRepository.save(user);
        }

        return mapUserToDTO(user);
    }

    private UserProfileDTO mapUserToDTO(User user) {
        UserProfileDTO response = new UserProfileDTO();
        response.setFirstName(user.getFirstName());
        response.setLastName(user.getLastName());
        response.setAvatar(user.getPhotoPath());
        response.setEmail(user.getEmail());
        return response;
    }

    private String saveImageFile(Long uid,String avatarPath,MultipartFile avatar) throws IOException {
        if(avatarPath != null){
            // Extract container name and blob name from the URL
            String[] parts = avatarPath.split("/");
            String containerName = parts[3]; // Container name is the 4th element in the URL
            String blobName = String.join("/", Arrays.copyOfRange(parts, 4, parts.length));

            // Get the BlobClient
            BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobName);

            // Delete the blob
            blobClient.delete();
        }

        String fullFilename;
        fullFilename = uid.toString() + "_";
        fullFilename += UUID.randomUUID().toString();

        BlobClient blobClient = blobServiceClient
                .getBlobContainerClient(env.getProperty("AVATAR_CONTAINER_NAME"))
                .getBlobClient(fullFilename);

        blobClient.upload(avatar.getInputStream(),avatar.getSize(),true);

        return blobClient.getBlobUrl();
    }
}
