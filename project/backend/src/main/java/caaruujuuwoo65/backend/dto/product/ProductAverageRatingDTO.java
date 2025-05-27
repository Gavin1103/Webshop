package caaruujuuwoo65.backend.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductAverageRatingDTO {
    private Long id;
    private String name;
    private String description;
    private BigDecimal currentPrice;
    private BigDecimal originalPrice;
    private String image;
    private Double averageRating ;
}
