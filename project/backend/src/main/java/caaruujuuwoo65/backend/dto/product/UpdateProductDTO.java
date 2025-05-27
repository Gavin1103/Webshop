package caaruujuuwoo65.backend.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProductDTO {
    private String name;
    private String description;
    private Double currentPrice;
    private Long categoryId;
}