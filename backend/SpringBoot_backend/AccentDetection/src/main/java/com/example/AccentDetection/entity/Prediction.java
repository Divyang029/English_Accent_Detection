package com.example.AccentDetection.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Entity
public class Prediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "accent_id", nullable = false)
    private Accent accent;

    @Column(nullable = false)
    private int ConfidenceScore;

    @Column(nullable = true)
    private String voicePath;

    @Column(nullable = false)
    private String predictionDate;

    public Prediction(String voice, Accent accent, Long id, User user) {
        this.voicePath = voice;
        this.accent = accent;
        this.id = id;
        this.user = user;
        this.predictionDate = formatDate(LocalDate.now());
    }

    public Prediction() {
        this.predictionDate = formatDate(LocalDate.now());
    }

    // Helper Method to Format Date
    private String formatDate(LocalDate date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM dd, yyyy");
        return date.format(formatter);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Accent getAccent() {
        return accent;
    }

    public void setAccent(Accent accent) {
        this.accent = accent;
    }

    public String getVoicePath() {
        return voicePath;
    }

    public void setVoicePath(String voicePath) {
        this.voicePath = voicePath;
    }

    public int getConfidenceScore() {
        return ConfidenceScore;
    }

    public void setConfidenceScore(int confidenceScore) {
        ConfidenceScore = confidenceScore;
    }

    public String getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(String predictionDate) {
        this.predictionDate = predictionDate;
    }
}


