package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.CreatePersonalDetailsDTO;
import caaruujuuwoo65.backend.dto.address.CreateAddressDTO;
import caaruujuuwoo65.backend.dto.order.detail.CreateCustomerOrderDetailDTO;
import caaruujuuwoo65.backend.dto.payment.CreatePaymentDetailsDTO;
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
public class CreateCustomerOrderDTO {
    private Long userId;

    @NotNull(message = "Order details are mandatory")
    private List<CreateCustomerOrderDetailDTO> orderDetails;

    @NotNull(message = "Payment details are mandatory")
    private CreatePaymentDetailsDTO paymentDetails;

    @NotNull(message = "Billing address is mandatory")
    private CreateAddressDTO billingAddress;

    private CreateAddressDTO shippingAddress;

    private CreatePersonalDetailsDTO personalDetails;
}