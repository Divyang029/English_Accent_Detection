package com.example.AccentDetection.dao;

import com.example.AccentDetection.entity.Accent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccentRepository extends JpaRepository<Accent, Long> {
    Optional<Accent> findByName(String name);
}
