package com.example.AccentDetection.service;
import com.example.AccentDetection.entity.Prediction;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PredictionService {
    Set<Prediction> getUserPredictions(Long id);
    Optional<Prediction> getPredictionById(Long id);
    Prediction createPrediction(String accentName, int score, MultipartFile voiceData) throws IOException;
    Prediction updatePrediction(Long id, Prediction updatedPrediction);
    void deletePrediction(Long id);
    void deleteAllPredictionsByUser(Long id);
}
