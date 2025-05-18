package com.example.AccentDetection.entity;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Accent")
public class Accent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String name;

    @Column(length = 1000)
    private String commonWords;

    @Column(length = 2000)
    private String influence;

    @ManyToMany(mappedBy = "accents")
    private Set<Country> countries;

    @Column(name = "is_predictable", nullable = false)
    private boolean isPredictable = false;
    public Accent() {}

    public Accent(Long id, String name, String commonWords, String influence) {
        this.id = id;
        this.name = name;
        this.commonWords = commonWords;
        this.influence = influence;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCommonWords() {
        return commonWords;
    }

    public void setCommonWords(String commonWords) {
        this.commonWords = commonWords;
    }

    public String getInfluence() {
        return influence;
    }

    public void setInfluence(String influence) {
        this.influence = influence;
    }

    public Set<Country> getCountries() {
        return countries;
    }

    public void setCountries(Set<Country> countries) {
        this.countries = countries;
    }
}
