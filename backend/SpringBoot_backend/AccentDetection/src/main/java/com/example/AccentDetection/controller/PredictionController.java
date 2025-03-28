package com.example.AccentDetection.controller;

import com.example.AccentDetection.dao.UserRepository;
import com.example.AccentDetection.dto.PredictionDTO;
import com.example.AccentDetection.entity.Country;
import com.example.AccentDetection.entity.Prediction;
import com.example.AccentDetection.entity.User;
import com.example.AccentDetection.service.PredictionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.AccentDetection.dto.CountryDTO;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/user/all")
    public ResponseEntity<Map<String, Object>> getUserPredictions() {
        Map<String, Object> response = new HashMap<>();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                response.put("status", HttpStatus.NOT_FOUND.value());
                response.put("message", "User not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Set<Prediction> predictions = predictionService.getUserPredictions(user.getId());

            // Convert Set<Prediction> to List<PredictionDTO>
            List<PredictionDTO> predictionDTOs = predictions.stream()
                    .map(prediction -> new PredictionDTO(
                            prediction.getId(),
                            prediction.getAccent().getName(),  // Assuming Accent entity has getName()
                            prediction.getVoicePath(),
                            prediction.getConfidenceScore(),
                            prediction.getPredictionDate()
                    ))
                    .toList();

            response.put("status", "success");
            response.put("predictions", predictionDTOs);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "An error occurred while fetching predictions.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public Optional<Prediction> getPredictionById(@PathVariable Long id) {
        return predictionService.getPredictionById(id);
    }

    @PostMapping(value = "/add",consumes = {"multipart/form-data"})
    public ResponseEntity<Set<CountryDTO>> createPrediction(
            @RequestPart("accentName") String accentName,
            @RequestPart("score") String score,
            @RequestPart("voice") MultipartFile voiceFile) {

        try {

            int parsedScore = Integer.parseInt(score); // Convert to int

            // Pass it to the service
            Prediction savedPrediction = predictionService.createPrediction(accentName,parsedScore,voiceFile);

            return ResponseEntity.ok(savedPrediction.getAccent()
                    .getCountries()
                    .stream()
                    .map(CountryDTO::new)
                    .collect(Collectors.toSet()));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }

    }

    @PutMapping("/{id}")
    public Prediction updatePrediction(@PathVariable Long id, @RequestBody Prediction updatedPrediction) {
        return predictionService.updatePrediction(id, updatedPrediction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deletePrediction(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            predictionService.deletePrediction(id);

            response.put("status", "success");
            response.put("predictions", "Prediction deleted successfully");
            return ResponseEntity.ok(response);
        } catch (EntityNotFoundException e) {
            response.put("status", HttpStatus.NOT_FOUND.value());
            response.put("message", "Prediction not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "An error occurred while deleting the prediction.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/user/all")
    public ResponseEntity<Map<String, Object>> deleteAllPredictionsByUser() {
        Map<String, Object> response = new HashMap<>();
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            User user = userRepository.findByEmail(email).orElse(null);

            if (user == null) {
                response.put("status", HttpStatus.NOT_FOUND.value());
                response.put("message", "User not found.");
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            predictionService.deleteAllPredictionsByUser(user.getId());

            response.put("status", "success");
            response.put("message", "All predictions deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("message", "An error occurred while deleting predictions.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
