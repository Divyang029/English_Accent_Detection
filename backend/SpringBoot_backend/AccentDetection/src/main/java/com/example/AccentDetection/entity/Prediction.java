package com.example.AccentDetection.entity;

import jakarta.persistence.*;

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

    @Column(nullable = true)
    private String voicePath;

    public Prediction(String voice, Accent accent, Long id, User user) {
        this.voicePath = voice;
        this.accent = accent;
        this.id = id;
        this.user = user;
    }

    public Prediction() {
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
}


