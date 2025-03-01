package com.example.AccentDetection.service;

import com.example.AccentDetection.entity.ProjectReview;

import java.util.List;
import java.util.Optional;

public interface ProjectReviewService {
    ProjectReview createReview(ProjectReview review);

    List<ProjectReview> getAllReviews();

    Optional<ProjectReview> getReviewById(Long id);

    Optional<ProjectReview> updateReview(Long id, ProjectReview updatedReview);

    boolean deleteReview(Long id);
}
