package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.Product;


@Getter
@Setter
public class OrderedProductsDTO {

    private Order order;

    private Product product;

    private int amount;
}