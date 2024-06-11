package caaruujuuwoo65.backend.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import caaruujuuwoo65.backend.dto.review.ReviewDTO;
import caaruujuuwoo65.backend.model.Review;
import caaruujuuwoo65.backend.repository.ReviewRepository;

@Service
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ModelMapper modelMapper) {
        this.reviewRepository = reviewRepository;
        this.modelMapper = modelMapper;
    }

    public ReviewDTO getReviewById(long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        return review != null ? modelMapper.map(review, ReviewDTO.class) : null;
    }

    public void deleteReview(long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
