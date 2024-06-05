package caaruujuuwoo65.backend.dto.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateProductDTO {
    private String name;
    private String description;
    private Integer stock;
    private Double currentPrice;
    private Double originalPrice;
    private List<String> image;
    private Long categoryId;
}