package com.example.AccentDetection.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import java.util.Set;

@Entity
public class Country {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = true)
    private String flagPath;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "country_accent",
            joinColumns = @JoinColumn(name = "country_id"),
            inverseJoinColumns = @JoinColumn(name = "accent_id")
    )
    private Set<Accent> accents;

    public Country() {
    }

    public Country(Long id, String name, String flagPath, Set<Accent> accents) {
        this.id = id;
        this.name = name;
        this.flagPath = flagPath;
        this.accents = accents;
    }

    // Getters and Setters
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

    public String getFlagPath() {
        return flagPath;
    }

    public void setFlagPath(String flagPath) {
        this.flagPath = flagPath;
    }

    public Set<Accent> getAccents() {
        return accents;
    }

    public void setAccents(Set<Accent> accents) {
        this.accents = accents;
    }
}
