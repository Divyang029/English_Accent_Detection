package com.example.AccentDetection.dto;
import com.example.AccentDetection.entity.Country;

public class CountryDTO {
    private String name;
    private String flagPath;

    public CountryDTO(Country country) {
        this.name = country.getName();
        this.flagPath = country.getFlagPath();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getFlagPath() {
        return flagPath;
    }

    public void setFlagPath(String flagPath) {
        this.flagPath = flagPath;
    }
}
