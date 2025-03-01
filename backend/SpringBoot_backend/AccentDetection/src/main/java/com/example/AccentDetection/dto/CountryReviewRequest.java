package com.example.AccentDetection.dto;

public class CountryReviewRequest {
    private String country;
    private String review;

    public CountryReviewRequest() {
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
}
