package com.example.AccentDetection.service;

import com.example.AccentDetection.dao.ProjectReviewRepository;
import com.example.AccentDetection.dao.UserRepository;
import com.example.AccentDetection.entity.ProjectReview;
import com.example.AccentDetection.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectReviewServiceImpl implements ProjectReviewService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectReviewRepository projectReviewRepository;

    // Create Review
    @Override
    public ProjectReview createReview(ProjectReview review) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        User user = userRepository.findByEmail(email).orElse(null);

        review.setReview_user(user);
        return projectReviewRepository.save(review);
    }

    // Get All Reviews
    @Override
    public List<ProjectReview> getAllReviews() {
        return projectReviewRepository.findAll();
    }

    // Get Review by ID
    @Override
    public Optional<ProjectReview> getReviewById(Long id) {
        return projectReviewRepository.findById(id);
    }

    // Update Review
    @Override
    public Optional<ProjectReview> updateReview(Long id, ProjectReview updatedReview) {
        return projectReviewRepository.findById(id).map(existingReview -> {
            existingReview.setReview(updatedReview.getReview());
            return projectReviewRepository.save(existingReview);
        });
    }

    // Delete Review
    @Override
    public boolean deleteReview(Long id) {
        if (projectReviewRepository.existsById(id)) {
            projectReviewRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
