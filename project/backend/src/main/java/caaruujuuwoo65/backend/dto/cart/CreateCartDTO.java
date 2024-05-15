package caaruujuuwoo65.backend.dto.cart;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new cart.
 * Used to transfer cart creation data between client and server.
 */
@Getter
@Setter
public class CreateCartDTO {
    private Long userId;
}