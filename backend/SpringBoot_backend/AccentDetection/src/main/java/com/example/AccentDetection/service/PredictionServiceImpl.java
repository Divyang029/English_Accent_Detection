package com.example.AccentDetection.service;

import com.example.AccentDetection.dao.AccentRepository;
import com.example.AccentDetection.dao.UserRepository;
import com.example.AccentDetection.entity.Accent;
import com.example.AccentDetection.entity.Prediction;
import com.example.AccentDetection.dao.PredictionRepository;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PredictionServiceImpl implements PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    @Autowired
    private AccentRepository accentRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Prediction> getAllPredictions() {
        return predictionRepository.findAll();
    }

    @Override
    public Optional<Prediction> getPredictionById(Long id) {
        return predictionRepository.findById(id);
    }

    @Override
    public Prediction createPrediction(String accentName,byte[] voiceData) {
        Accent accent = accentRepository.findByName(accentName).orElse(null);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        Prediction prediction = new Prediction();

        prediction.setAccent(accent);
        prediction.setUser(user);

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

    @Override
    public void deletePrediction(Long id) {
        predictionRepository.deleteById(id);
    }
}
