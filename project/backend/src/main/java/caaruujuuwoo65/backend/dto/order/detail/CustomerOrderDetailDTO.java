package caaruujuuwoo65.backend.dto.order.detail;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Data Transfer Object for representing order detail data in responses.
 * Used to transfer order detail information from server to client.
 */
@Getter
@Setter
public class CustomerOrderDetailDTO {
    private Long orderDetailId;
    private Long orderId;
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}