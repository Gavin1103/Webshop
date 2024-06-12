package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.PersonalDetailsDTO;
import caaruujuuwoo65.backend.dto.address.AddressDTO;
import caaruujuuwoo65.backend.dto.order.detail.CustomerOrderDetailDTO;
import caaruujuuwoo65.backend.dto.payment.PaymentDetailsDTO;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

/**
 * Data Transfer Object for representing order data in responses.
 * Used to transfer order information from server to client.
 */
@Getter
@Setter
public class CustomerOrderDTO {
    private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private String status;
    private BigDecimal totalAmount;
    private List<CustomerOrderDetailDTO> orderDetails;
    private PaymentDetailsDTO paymentDetails;
    private AddressDTO billingAddress;
    private AddressDTO shippingAddress;
    private PersonalDetailsDTO personalDetails;
}