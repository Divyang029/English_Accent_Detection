package com.example.AccentDetection.service;

import com.example.AccentDetection.dto.CountryReviewRequest;
import com.example.AccentDetection.dto.CountryReviewResponse;
import com.example.AccentDetection.entity.CountryReview;

import java.util.List;

public interface CountryReviewService {
    List<CountryReviewResponse> addReview(CountryReviewRequest countryReviewRequest);
    List<CountryReviewResponse> getReviewsByCountry(String countryName);
    void deleteReview(Long id);
}
