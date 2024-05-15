package caaruujuuwoo65.backend.dto.cartItem;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Data Transfer Object for representing cart item data in responses.
 * Used to transfer cart item information from server to client.
 */
@Getter
@Setter
public class CartItemDTO {
    private Long cartItemId;
    private Long productId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
}