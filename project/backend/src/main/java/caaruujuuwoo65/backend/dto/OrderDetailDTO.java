package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


@Getter
@Setter
public class OrderDetailDTO {
    private Long orderDetailId;
    private Long orderId;
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}