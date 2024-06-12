package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.PersonalDetailsDTO;
import caaruujuuwoo65.backend.dto.address.AddressDTO;
import caaruujuuwoo65.backend.dto.order.detail.UpdateCustomerOrderDetailDTO;
import caaruujuuwoo65.backend.dto.payment.UpdatePaymentDetailsDTO;
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
    @NotNull(message = "Order ID is mandatory")
    private Long orderId;

    @NotNull(message = "User ID is mandatory")
    private Long userId;

    @NotNull(message = "Order details are mandatory")
    private List<UpdateCustomerOrderDetailDTO> orderDetails;

    @NotNull(message = "Payment details are mandatory")
    private UpdatePaymentDetailsDTO paymentDetails;

    @NotNull(message = "Billing address is mandatory")
    private AddressDTO billingAddress;

    private AddressDTO shippingAddress;

    @NotNull(message = "Personal details are mandatory")
    private PersonalDetailsDTO personalDetails;
}