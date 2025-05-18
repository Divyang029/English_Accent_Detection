package com.example.AccentDetection.service;

import com.example.AccentDetection.dao.AccentRepository;
import com.example.AccentDetection.dto.CountryDTO;
import com.example.AccentDetection.entity.Accent;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AccentServiceImpl implements AccentService {

    private final AccentRepository accentRepository;

    public AccentServiceImpl(AccentRepository accentRepository) {
        this.accentRepository = accentRepository;
    }

    @Override
    public Accent createAccent(Accent accent) {
        return accentRepository.save(accent);
    }

    @Override
    public List<Accent> getAllAccents() {
        return accentRepository.findByIsPredictableTrue();
    }

    @Override
    public Optional<Accent> getAccentById(Long id) {
        return accentRepository.findById(id);
    }

    @Override
    public Optional<Accent> updateAccent(Long id, Accent updatedAccent) {
        return accentRepository.findById(id).map(existingAccent -> {
            existingAccent.setName(updatedAccent.getName());
            return accentRepository.save(existingAccent);
        });
    }

    @Override
    public boolean deleteAccent(Long id) {
        if (accentRepository.existsById(id)) {
            accentRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Optional<Set<CountryDTO>> getCountriesByAccentName(String accentName) {
        return accentRepository.findByName(accentName).map(accent ->
                accent.getCountries().stream()
                        .map(CountryDTO::new) // Convert to DTO
                        .collect(Collectors.toSet())
        );
    }
}
