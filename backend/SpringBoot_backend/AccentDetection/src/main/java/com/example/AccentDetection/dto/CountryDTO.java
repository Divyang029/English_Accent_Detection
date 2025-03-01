package com.example.AccentDetection.dto;
import com.example.AccentDetection.entity.Country;

public class CountryDTO {
    private String name;
    private String history;
    private String culture;
    private String flagPath;

    public CountryDTO(Country country) {
        this.name = country.getName();
        this.history = country.getHistory();
        this.culture = country.getCulture();
        this.flagPath = country.getFlagPath();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getFlagPath() {
        return flagPath;
    }

    public void setFlagPath(String flagPath) {
        this.flagPath = flagPath;
    }

    public String getCulture() {
        return culture;
    }

    public void setCulture(String culture) {
        this.culture = culture;
    }
}
