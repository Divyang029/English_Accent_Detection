package com.example.AccentDetection.service;
import com.example.AccentDetection.entity.Prediction;
import java.util.List;
import java.util.Optional;

public interface PredictionService {
    List<Prediction> getAllPredictions();
    Optional<Prediction> getPredictionById(Long id);
    Prediction createPrediction(String accentName,byte[] voiceData);
    Prediction updatePrediction(Long id, Prediction updatedPrediction);
    void deletePrediction(Long id);
}
