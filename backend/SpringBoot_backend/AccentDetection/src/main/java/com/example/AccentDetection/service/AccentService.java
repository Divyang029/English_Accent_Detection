package com.example.AccentDetection.service;

import com.example.AccentDetection.dto.CountryDTO;
import com.example.AccentDetection.entity.Accent;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface AccentService {
    Accent createAccent(Accent accent);

    List<Accent> getAllAccents();

    Optional<Accent> getAccentById(Long id);

    Optional<Accent> updateAccent(Long id, Accent updatedAccent);

    boolean deleteAccent(Long id);

    Optional<Set<CountryDTO>> getCountriesByAccentName(String accentName);
}
