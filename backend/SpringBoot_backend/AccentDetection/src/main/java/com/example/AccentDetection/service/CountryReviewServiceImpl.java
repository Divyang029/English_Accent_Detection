package com.example.AccentDetection.service;

import com.example.AccentDetection.dao.CountryRepository;
import com.example.AccentDetection.dao.CountryReviewRepository;
import com.example.AccentDetection.dao.UserRepository;
import com.example.AccentDetection.dto.CountryReviewRequest;
import com.example.AccentDetection.dto.CountryReviewResponse;
import com.example.AccentDetection.entity.Country;
import com.example.AccentDetection.entity.CountryReview;
import com.example.AccentDetection.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryReviewServiceImpl implements CountryReviewService {

    private final CountryReviewRepository countryReviewRepository;
    private final UserRepository userRepository;
    private final CountryRepository countryRepository;

    public CountryReviewServiceImpl(CountryReviewRepository countryReviewRepository, UserRepository userRepository, CountryRepository countryRepository) {
        this.countryReviewRepository = countryReviewRepository;
        this.userRepository = userRepository;
        this.countryRepository = countryRepository;
    }

    @Override
    public List<CountryReviewResponse> addReview(CountryReviewRequest countryReviewRequest) {
        Country country = countryRepository.findByName(countryReviewRequest.getCountry())
                .orElseThrow(() -> new RuntimeException("Country not found"));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        CountryReview review = new CountryReview();
        review.setUser(user);
        review.setCountry(country);
        review.setReview(countryReviewRequest.getReview());

        countryReviewRepository.save(review);

        return countryReviewRepository.findByCountry_Name(countryReviewRequest.getCountry())
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());

    }

    @Override
    public List<CountryReviewResponse> getReviewsByCountry(String countryName) {
        return countryReviewRepository.findByCountry_Name(countryName)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());    }

    @Override
    public void deleteReview(Long id) {
        countryReviewRepository.deleteById(id);
    }

    private CountryReviewResponse convertToResponse(CountryReview review) {
        return new CountryReviewResponse(
                review.getId(),
                review.getReview(),
                review.getUser().getFirstName(),
                review.getUser().getLastName()
        );
    }
}
