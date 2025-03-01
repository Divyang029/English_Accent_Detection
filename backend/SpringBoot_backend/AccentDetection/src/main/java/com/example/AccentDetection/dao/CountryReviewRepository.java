package com.example.AccentDetection.dao;

import com.example.AccentDetection.entity.CountryReview;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CountryReviewRepository extends JpaRepository<CountryReview, Long> {
    List<CountryReview> findByCountry_Name(String countryName);
}
