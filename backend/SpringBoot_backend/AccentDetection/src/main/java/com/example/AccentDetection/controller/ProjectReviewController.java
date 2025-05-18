package com.example.AccentDetection.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project_reviews")
public class ProjectReviewController {
    private final ProjectReviewService projectReviewService;

    public ProjectReviewController(ProjectReviewService projectReviewService) {
        this.projectReviewService = projectReviewService;
    }

    // Create Review
    @PostMapping
    public ResponseEntity<ProjectReview> createReview(@RequestBody ProjectReview review) {
        ProjectReview savedReview = projectReviewService.createReview(review);
        return ResponseEntity.ok(savedReview);
    }

    // Get All Reviews
    @GetMapping
    public ResponseEntity<List<ProjectReview>> getAllReviews() {
        return ResponseEntity.ok(projectReviewService.getAllReviews());
    }

    // Get Review by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProjectReview> getReviewById(@PathVariable Long id) {
        return projectReviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update Review
    @PutMapping("/{id}")
    public ResponseEntity<ProjectReview> updateReview(@PathVariable Long id, @RequestBody ProjectReview updatedReview) {
        return projectReviewService.updateReview(id, updatedReview)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete Review
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        return projectReviewService.deleteReview(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}
