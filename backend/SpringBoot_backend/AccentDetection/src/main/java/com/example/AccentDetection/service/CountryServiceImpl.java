package com.example.AccentDetection.service;

import com.example.AccentDetection.dao.CountryRepository;
import com.example.AccentDetection.dto.AccentDTO;
import com.example.AccentDetection.dto.CountryAccentDTO;
import com.example.AccentDetection.entity.Country;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements CountryService {

    private final CountryRepository countryRepository;

    public CountryServiceImpl(CountryRepository countryRepository) {
        this.countryRepository = countryRepository;
    }

    private CountryAccentDTO convertToDTO(Country country) {
        Set<AccentDTO> accentDTOs = country.getAccents().stream()
                .map(accent -> new AccentDTO(
                        accent.getId(),
                        accent.getName(),
                        accent.getCommonWords(),
                        accent.getInfluence(),
                        accent.getCountries().stream().map(Country::getName).collect(Collectors.toSet())  // Only country names
                ))
                .collect(Collectors.toSet());

        return new CountryAccentDTO(country.getId(), country.getName(), country.getFlagPath(), accentDTOs);
    }

    @Override
    public List<CountryAccentDTO> getAllCountries() {
        return countryRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    @Override
    public Optional<CountryAccentDTO> getCountryById(Long id) {
        return countryRepository.findById(id).map(this::convertToDTO);
    }

    @Override
    public Optional<CountryAccentDTO> getCountryByName(String name) {
        return countryRepository.findByName(name).map(this::convertToDTO);
    }

    @Override
    public Country saveCountry(Country country) {
        return countryRepository.save(country);
    }

    @Override
    public Country updateCountry(Long id, Country countryDetails) {
        return countryRepository.findById(id).map(existingCountry -> {
            existingCountry.setName(countryDetails.getName());
            existingCountry.setFlagPath(countryDetails.getFlagPath());
            existingCountry.setAccents(countryDetails.getAccents());
            return countryRepository.save(existingCountry);
        }).orElseThrow(() -> new RuntimeException("Country not found"));
    }

    @Override
    public void deleteCountry(Long id) {
        countryRepository.deleteById(id);
    }
}
