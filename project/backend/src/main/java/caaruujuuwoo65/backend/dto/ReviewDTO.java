package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.model.User;
import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewDTO {
    private int rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Product product;
    private User user;
}