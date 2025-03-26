package com.example.AccentDetection.dao;

import com.example.AccentDetection.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
public interface PredictionRepository extends JpaRepository<Prediction, Long> {
    @Query("SELECT p FROM Prediction p WHERE p.user.id = :userId")
    Set<Prediction> findByUserId(@Param("userId") Long userId);
}
