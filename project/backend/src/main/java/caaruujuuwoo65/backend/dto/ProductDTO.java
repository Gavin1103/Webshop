package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.TypeProduct;
import caaruujuuwoo65.backend.model.CategoryProduct;

@Getter
@Setter
public class ProductDTO {
    private String name;
    private Number price;
    private String description;
    private Number stock;
    private String image;
    private TypeProduct type;
    private CategoryProduct category;
}