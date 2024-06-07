package caaruujuuwoo65.backend.dto.product;

import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDTO {
    private Long id;
    private String name;
    private String description;
    private List<String> image = new ArrayList<>(); ;
    private Integer stock;
    private Double currentPrice;
    private Double originalPrice;
    private ProductCategoryDTO productCategory;
}
