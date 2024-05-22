package caaruujuuwoo65.backend.dto.cartItem;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for updating an existing cart item.
 * Used to transfer cart item update data between client and server.
 */
@Getter
@Setter
public class UpdateCartItemDTO {
    private Integer quantity;
}