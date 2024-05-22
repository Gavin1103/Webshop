package caaruujuuwoo65.backend.dto.review;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateReviewDTO {
    private Long productId;
    private Long userId;
    private Integer rating;
    private String comment;
    private LocalDateTime reviewDate;
}