package com.example.AccentDetection.dto;

import java.util.Set;
import java.util.stream.Collectors;

public class CountryAccentDTO {
    private Long id;
    private String name;
    private String flagPath;
    private Set<AccentDTO> accents;

    public CountryAccentDTO(Long id, String name, String flagPath, Set<AccentDTO> accents) {
        this.id = id;
        this.name = name;
        this.flagPath = flagPath;
        this.accents = accents;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getFlagPath() {
        return flagPath;
    }

    public Set<AccentDTO> getAccents() {
        return accents;
    }
}
