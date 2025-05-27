package caaruujuuwoo65.backend.dto.review;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;
import caaruujuuwoo65.backend.dto.user.UserReviewInfoDTO;

@Getter
@Setter
public class ReviewDTO {
    private Long reviewId;
    private Integer rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserReviewInfoDTO user;
}