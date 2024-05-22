package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.order.detail.UpdateCustomerOrderDetailDTO;
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
public class UpdateCustomerOrderDTO {
    @NotNull(message = "Status is mandatory")
    private String status;

    private List<UpdateCustomerOrderDetailDTO> orderDetails;
}