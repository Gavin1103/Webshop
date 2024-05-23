package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateFeedbackDTO {
    private Long feedbackId;
    private String image;
    private String feedback;
    private LocalDateTime createdAt;
}