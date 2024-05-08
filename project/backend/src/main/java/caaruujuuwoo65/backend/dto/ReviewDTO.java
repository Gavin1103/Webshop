package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewDTO {
    private int rating;
    private String review;
    private Date createdAt;
    private Date updatedAt;
    private Product product;
    private User user;
}