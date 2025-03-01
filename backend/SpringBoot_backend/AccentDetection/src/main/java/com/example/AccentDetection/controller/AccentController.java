package com.example.AccentDetection.controller;

import com.example.AccentDetection.dto.CountryDTO;
import com.example.AccentDetection.entity.Accent;
import com.example.AccentDetection.service.AccentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/accent")
public class AccentController {
    @Autowired
    private AccentService accentService;

    // Create a new Accent
    @PostMapping
    public ResponseEntity<Accent> createAccent(@RequestBody Accent accent) {
        Accent createdAccent = accentService.createAccent(accent);
        return ResponseEntity.ok().body(createdAccent);
    }

    // Get all Accents
    @GetMapping
    public ResponseEntity<List<Accent>> getAllAccents() {
        List<Accent> accents = accentService.getAllAccents();
        return ResponseEntity.ok().body(accents);
    }

    // Get Accent by ID
    @GetMapping("/{id}")
    public ResponseEntity<Accent> getAccentById(@PathVariable Long id) {
        Optional<Accent> accent = accentService.getAccentById(id);
        return accent.map(value -> ResponseEntity.ok().body(value))
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an Accent
    @PutMapping("/{id}")
    public ResponseEntity<Accent> updateAccent(@PathVariable Long id, @RequestBody Accent accent) {
        Optional<Accent> updatedAccent = accentService.updateAccent(id, accent);
        return updatedAccent.map(value -> ResponseEntity.ok().body(value))
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an Accent
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccent(@PathVariable Long id) {
        boolean deleted = accentService.deleteAccent(id);
        return deleted ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

    // Get Countries by Accent Name
    @GetMapping("/{name}/countries")
    public ResponseEntity<Set<CountryDTO>> getCountriesByAccentName(@PathVariable String name) {
        Optional<Set<CountryDTO>> countries = accentService.getCountriesByAccentName(name);
        return countries.map(value -> ResponseEntity.ok().body(value))
                .orElse(ResponseEntity.notFound().build());
    }
}
