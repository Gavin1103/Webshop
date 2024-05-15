package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ProductDTO {
    private Long productId;
    private String productName;
    private String description;
    private String[] imageUrls;
    private Number stock;
    private BigDecimal price;
    private Long categoryId;
}