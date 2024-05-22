package caaruujuuwoo65.backend.dto.cart;

import caaruujuuwoo65.backend.dto.cartItem.CartItemDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

/**
 * Data Transfer Object for representing cart data in responses.
 * Used to transfer cart information from server to client.
 */
@Getter
@Setter
public class CartDTO {
    private Long cartId;
    private Long userId;
    private Set<CartItemDTO> cartItems;
}