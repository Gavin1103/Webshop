package caaruujuuwoo65.backend.dto.product;

import java.util.ArrayList;
import java.util.List;

import caaruujuuwoo65.backend.dto.review.ReviewDTO;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductReviewsDTO {
    private ProductDTO product;
    private List<ReviewDTO> reviews = new ArrayList<>();
}
