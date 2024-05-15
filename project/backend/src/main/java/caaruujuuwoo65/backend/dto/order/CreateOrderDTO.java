package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.order.detail.CreateOrderDetailDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Data Transfer Object for creating a new order.
 * Used to transfer order creation data between client and server.
 */
@Getter
@Setter
public class CreateOrderDTO {
    @NotNull(message = "User ID is mandatory")
    private Long userId;

    @NotNull(message = "Order details are mandatory")
    private List<CreateOrderDetailDTO> orderDetails;
}