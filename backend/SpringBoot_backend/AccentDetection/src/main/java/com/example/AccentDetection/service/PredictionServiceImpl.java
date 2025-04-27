package com.example.AccentDetection.service;

import com.azure.storage.blob.BlobClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import com.example.AccentDetection.dao.AccentRepository;
import com.example.AccentDetection.dao.UserRepository;
import com.example.AccentDetection.entity.Accent;
import com.example.AccentDetection.entity.Prediction;
import com.example.AccentDetection.dao.PredictionRepository;
import com.example.AccentDetection.entity.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PredictionServiceImpl implements PredictionService {
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
    private PredictionRepository predictionRepository;

    @Autowired
    private AccentRepository accentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public Set<Prediction> getUserPredictions(Long id) {
        return predictionRepository.findByUserId(id);
    }

    @Override
    public Optional<Prediction> getPredictionById(Long id) {
        return predictionRepository.findById(id);
    }

    private String uploadVoice(MultipartFile voiceData) throws IOException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        String fullFilename;
        fullFilename = user.getId().toString() + "_";
        fullFilename += UUID.randomUUID().toString();

        BlobClient blobClient = blobServiceClient
                .getBlobContainerClient(env.getProperty("VOICE_CONTAINER_NAME"))
                .getBlobClient(fullFilename);

        blobClient.upload(voiceData.getInputStream(),voiceData.getSize(),true);

        return blobClient.getBlobUrl();
    }

    @Override
    public Prediction createPrediction(String accentName,int score,MultipartFile voiceData) throws IOException {
        Accent accent = accentRepository.findByName(accentName).orElse(null);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        Prediction prediction = new Prediction();

        prediction.setAccent(accent);
        prediction.setUser(user);
        prediction.setConfidenceScore(score);

        if (!voiceData.isEmpty()){
            String voiceurl = uploadVoice(voiceData);
            prediction.setVoicePath(voiceurl);
        }

        return predictionRepository.save(prediction);
    }

    @Override
    public Prediction updatePrediction(Long id, Prediction updatedPrediction) {
        if (predictionRepository.existsById(id)) {
            updatedPrediction.setId(id);
            return predictionRepository.save(updatedPrediction);
        }
        throw new RuntimeException("Prediction not found with id " + id);
    }

    // Method to delete a file using the Blob URL
    private void deleteBlobByUrl(String blobUrl) {
        try {
            // Extract container name and blob name from the URL
            String[] parts = blobUrl.split("/");
            String containerName = parts[3]; // Container name is the 4th element in the URL
            String blobName = String.join("/", Arrays.copyOfRange(parts, 4, parts.length));

            // Get the BlobClient
            BlobClient blobClient = blobServiceClient.getBlobContainerClient(containerName).getBlobClient(blobName);

            // Delete the blob
            blobClient.delete();
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error deleting the blob: " + e.getMessage());
        }
    }

    @Override
    public void deletePrediction(Long id) {
        Prediction prediction = predictionRepository.findById(id).orElse(null);

        if(prediction.getVoicePath() != null)
            deleteBlobByUrl(prediction.getVoicePath());

        predictionRepository.deleteById(id);
    }

    @Transactional
    @Override
    public void deleteAllPredictionsByUser(Long id) {
        Set<Prediction> predictions = predictionRepository.findByUserId(id);

        for (Prediction prediction : predictions) {
            if(prediction.getVoicePath() != null)
                deleteBlobByUrl(prediction.getVoicePath());
            predictionRepository.delete(prediction);
        }
    }
}
