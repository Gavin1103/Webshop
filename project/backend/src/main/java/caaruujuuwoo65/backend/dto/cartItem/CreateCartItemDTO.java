package caaruujuuwoo65.backend.dto.cartItem;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new cart item.
 * Used to transfer cart item creation data between client and server.
 */
@Getter
@Setter
public class CreateCartItemDTO {
    private Long productId;
    private Integer quantity;
}