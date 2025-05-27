package caaruujuuwoo65.backend.dto.cart;

import caaruujuuwoo65.backend.dto.cartItem.CartItemDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

/**
 * Data Transfer Object for updating an existing cart.
 * Used to transfer cart update data between client and server.
 */
@Getter
@Setter
public class UpdateCartDTO {
    private Long cartId;
    private Long userId;
    private Set<CartItemDTO> cartItems;
}