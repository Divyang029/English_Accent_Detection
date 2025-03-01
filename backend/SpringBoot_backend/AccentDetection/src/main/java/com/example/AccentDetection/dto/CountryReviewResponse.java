package com.example.AccentDetection.dto;

public class CountryReviewResponse {
    private Long id;
    private String review;
    private String userFirstName;
    private String userLastName;

    public CountryReviewResponse(Long id, String review, String userFirstName, String userLastName) {
        this.id = id;
        this.review = review;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }
}
