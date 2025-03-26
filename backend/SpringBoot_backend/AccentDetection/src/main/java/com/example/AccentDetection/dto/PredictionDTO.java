package com.example.AccentDetection.dto;

public class PredictionDTO {
    private Long id;
    private String accentName;
    private String voicePath;
    private int confidenceScore;
    private String predictionDate;

    public PredictionDTO(Long id, String accentName, String voicePath, int confidenceScore, String predictionDate) {
        this.id = id;
        this.accentName = accentName;
        this.voicePath = voicePath;
        this.confidenceScore = confidenceScore;
        this.predictionDate = predictionDate;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccentName() {
        return accentName;
    }

    public void setAccentName(String accentName) {
        this.accentName = accentName;
    }

    public String getVoicePath() {
        return voicePath;
    }

    public void setVoicePath(String voicePath) {
        this.voicePath = voicePath;
    }

    public int getConfidenceScore() {
        return confidenceScore;
    }

    public void setConfidenceScore(int confidenceScore) {
        this.confidenceScore = confidenceScore;
    }

    public String getPredictionDate() {
        return predictionDate;
    }

    public void setPredictionDate(String predictionDate) {
        this.predictionDate = predictionDate;
    }
}
