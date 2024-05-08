package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderedProductsDTO {

    private Order order;

    private Product product;

    private int amount;
}