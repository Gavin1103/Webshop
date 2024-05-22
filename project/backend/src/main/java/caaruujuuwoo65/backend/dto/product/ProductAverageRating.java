package caaruujuuwoo65.backend.dto.product;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductAverageRating {
    private String name;
    private String description;
    private BigDecimal price;
    private Double averageRating ;
}
