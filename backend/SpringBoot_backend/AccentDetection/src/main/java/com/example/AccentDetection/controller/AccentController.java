package com.example.AccentDetection.controller;

import com.example.AccentDetection.dto.AccentDTO;
import com.example.AccentDetection.dto.CountryDTO;
import com.example.AccentDetection.entity.Accent;
import com.example.AccentDetection.entity.Country;
import com.example.AccentDetection.service.AccentService;
import com.example.AccentDetection.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/accent")
public class AccentController {
    @Autowired
    private AccentService accentService;


    // Convert Accent Entity to AccentDTO
    private AccentDTO mapToDTO(Accent accent) {
        Set<String> countryNames = accent.getCountries()
                .stream()
                .map(country -> country.getName())  // Extract country names
                .collect(Collectors.toSet());

        return new AccentDTO(accent.getId(), accent.getName(), accent.getCommonWords(), accent.getInfluence(), countryNames);
    }

    // Get all Accents and return as DTOs
    @GetMapping
    public List<AccentDTO> getAllAccents() {
        List<Accent> accents = accentService.getAllAccents();
        return accents.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Get Accent by ID and return as DTO
    @GetMapping("/{id}")
    public Optional<AccentDTO> getAccentById(Long id) {
        return accentService.getAccentById(id).map(this::mapToDTO);
    }

    // Get names of all accents
    @GetMapping("/names")
    public List<String> getAllAccentNames() {
        List<Accent> accents = accentService.getAllAccents();
        return accents.stream()
                .map(Accent::getName)
                .collect(Collectors.toList());
    }

    // Delete an Accent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccent(@PathVariable Long id) {
        boolean deleted = accentService.deleteAccent(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Get Countries by Accent Name
    @GetMapping("/{name}/countries")
    public ResponseEntity<Set<String>> getCountriesByAccentName(@PathVariable String name) {
        Optional<Set<CountryDTO>> countries = accentService.getCountriesByAccentName(name);
        return countries.map(countrySet -> {
            Set<String> countryNames = countrySet.stream()
                    .map(CountryDTO::getName)
                    .collect(Collectors.toSet());
            return ResponseEntity.ok().body(countryNames);
        }).orElse(ResponseEntity.notFound().build());
    }
}
