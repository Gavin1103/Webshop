package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.order.detail.UpdateOrderDetailDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * Data Transfer Object for updating an existing order.
 * Used to transfer order update data between client and server.
 */
@Getter
@Setter
public class UpdateOrderDTO {
    @NotNull(message = "Status is mandatory")
    private String status;

    private List<UpdateOrderDetailDTO> orderDetails;
}