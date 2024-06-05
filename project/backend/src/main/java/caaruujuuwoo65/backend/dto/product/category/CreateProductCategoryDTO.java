package caaruujuuwoo65.backend.dto.product.category;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductCategoryDTO {
    private String name;
    private String description;
}