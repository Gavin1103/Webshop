package caaruujuuwoo65.backend.dto.product.category;

import caaruujuuwoo65.backend.model.Product;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CategoryWithProductsDTO {
    private Long id;
    private String name;
    private List<Product> products;
}
