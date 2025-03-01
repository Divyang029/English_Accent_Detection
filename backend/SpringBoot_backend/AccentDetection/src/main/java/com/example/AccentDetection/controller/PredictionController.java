package com.example.AccentDetection.controller;

import com.example.AccentDetection.entity.Country;
import com.example.AccentDetection.entity.Prediction;
import com.example.AccentDetection.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.example.AccentDetection.dto.CountryDTO;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/prediction")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @GetMapping
    public List<Prediction> getAllPredictions() {
        return predictionService.getAllPredictions();
    }

    @GetMapping("/{id}")
    public Optional<Prediction> getPredictionById(@PathVariable Long id) {
        return predictionService.getPredictionById(id);
    }

    @PostMapping(value = "/add",consumes = {"multipart/form-data"})
    public ResponseEntity<Set<CountryDTO>> createPrediction(
            @RequestPart("accentName") String accentName,
            @RequestPart("voice") MultipartFile voiceFile) {

        try {
            // Convert the MultipartFile to a byte array (or store it in a file system)
            byte[] voiceData = voiceFile.getBytes();

            // Pass it to the service
            Prediction savedPrediction = predictionService.createPrediction(accentName,voiceData);

            return ResponseEntity.ok(savedPrediction.getAccent()
                    .getCountries()
                    .stream()
                    .map(CountryDTO::new)
                    .collect(Collectors.toSet()));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    public Prediction updatePrediction(@PathVariable Long id, @RequestBody Prediction updatedPrediction) {
        return predictionService.updatePrediction(id, updatedPrediction);
    }

    @DeleteMapping("/{id}")
    public void deletePrediction(@PathVariable Long id) {
        predictionService.deletePrediction(id);
    }
}
