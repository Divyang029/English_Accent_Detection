package com.example.AccentDetection.service;

import com.example.AccentDetection.dto.CountryAccentDTO;
import com.example.AccentDetection.entity.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<CountryAccentDTO> getAllCountries();
    Optional<CountryAccentDTO> getCountryById(Long id);
    Optional<CountryAccentDTO> getCountryByName(String name);
    Country saveCountry(Country country);
    Country updateCountry(Long id, Country countryDetails);
    void deleteCountry(Long id);
}