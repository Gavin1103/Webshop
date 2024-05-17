package caaruujuuwoo65.backend.dto.review;

import caaruujuuwoo65.backend.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDTO {
    private Long reviewId;
    private Integer rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Product product;
    private Long userId;
}