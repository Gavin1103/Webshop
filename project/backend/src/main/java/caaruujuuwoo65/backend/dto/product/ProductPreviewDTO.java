package caaruujuuwoo65.backend.dto.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductPreviewDTO {
    public Long id;
    public String name;
    public String image;
    public Double currentPrice;
    public Double originalPrice;
}
