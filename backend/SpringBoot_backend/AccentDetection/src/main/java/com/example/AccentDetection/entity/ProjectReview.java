package com.example.AccentDetection.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "Project_Review")
public class ProjectReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate primary key
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private User review_user;

    @Column(nullable = false)
    private String review;

    public ProjectReview(){ }

    public ProjectReview(Long id, User review_user, String review) {
        this.id = id;
        this.review_user = review_user;
        this.review = review;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getReview_user() {
        return review_user;
    }

    public void setReview_user(User review_user) {
        this.review_user = review_user;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
