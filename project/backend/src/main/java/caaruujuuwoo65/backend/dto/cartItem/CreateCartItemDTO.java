package caaruujuuwoo65.backend.dto.cartItem;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new cart item.
 * Used to transfer cart item creation data between client and server.
 */
@Getter
@Setter
public class CreateCartItemDTO {
    @NotNull(message = "product ID is mandatory")
    private Long productId;
    private Integer quantity;
}