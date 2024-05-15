package caaruujuuwoo65.backend.dto.order.detail;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * Data Transfer Object for creating a new order detail.
 * Used to transfer order detail creation data between client and server.
 */
@Getter
@Setter
public class CreateOrderDetailDTO {
    @NotNull(message = "Product ID is mandatory")
    private Long productId;

    @NotNull(message = "Quantity is mandatory")
    private Integer quantity;

    @NotNull(message = "Price is mandatory")
    private BigDecimal price;
}