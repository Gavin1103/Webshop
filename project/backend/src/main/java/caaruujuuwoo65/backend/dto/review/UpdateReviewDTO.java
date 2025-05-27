package caaruujuuwoo65.backend.dto.review;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateReviewDTO {
    private Integer rating;
    private String comment;
}