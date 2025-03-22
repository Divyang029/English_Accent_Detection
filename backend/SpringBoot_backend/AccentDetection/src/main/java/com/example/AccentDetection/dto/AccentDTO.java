package com.example.AccentDetection.dto;

import java.util.Set;

public class AccentDTO {
    private Long id;
    private String name;
    private String commonWords;
    private String influence;
    private Set<String> countryNames;  // Prevent infinite recursion

    public AccentDTO(Long id, String name, String commonWords, String influence, Set<String> countryNames) {
        this.id = id;
        this.name = name;
        this.commonWords = commonWords;
        this.influence = influence;
        this.countryNames = countryNames;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getCommonWords() {
        return commonWords;
    }

    public String getInfluence() {
        return influence;
    }

    public Set<String> getCountryNames() {
        return countryNames;
    }
}
