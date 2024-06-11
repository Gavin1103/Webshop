package caaruujuuwoo65.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import caaruujuuwoo65.backend.dto.review.ReviewDTO;
import caaruujuuwoo65.backend.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("getBy/{id}")
    @Operation(summary = "Get review by id", description = "Get review by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Review successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Review not found"),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> getReviewById(@PathVariable int id) {
        ReviewDTO review = reviewService.getReviewById((long) id);
        if (review == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Review not found");
        }
        return ResponseEntity.ok(review);
    }

    @PostMapping("/delete/{id}")
    @Operation(summary = "Delete review", description = "Get review by id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Review successfully deleted"),
            @ApiResponse(responseCode = "404", description = "Review not found"),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> deleteReview(@PathVariable int id) {
        reviewService.deleteReview((long) id);
        return ResponseEntity.ok(true);
    }
}
