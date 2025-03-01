package com.example.AccentDetection.controller;

import com.example.AccentDetection.dto.CountryReviewRequest;
import com.example.AccentDetection.dto.CountryReviewResponse;
import com.example.AccentDetection.entity.CountryReview;
import com.example.AccentDetection.service.CountryReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/country_reviews")
public class CountryReviewController {

    private final CountryReviewService countryReviewService;

    public CountryReviewController(CountryReviewService countryReviewService) {
        this.countryReviewService = countryReviewService;
    }

    @PostMapping("/add")
    public ResponseEntity<List<CountryReviewResponse>> addReview(@RequestBody CountryReviewRequest countryReviewRequest) {
        List<CountryReviewResponse> updatedReviews = countryReviewService.addReview(countryReviewRequest);
        return ResponseEntity.ok(updatedReviews);
    }

    @GetMapping("/{countryName}")
    public ResponseEntity<List<CountryReviewResponse>> getReviewsByCountry(@PathVariable String countryName) {
        List<CountryReviewResponse> reviews = countryReviewService.getReviewsByCountry(countryName);
        return ResponseEntity.ok(reviews);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteReview(@PathVariable Long id) {
        countryReviewService.deleteReview(id);
        return ResponseEntity.ok("Review deleted successfully!");
    }
}
