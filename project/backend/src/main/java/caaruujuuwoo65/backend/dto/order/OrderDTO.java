package caaruujuuwoo65.backend.dto.order;

import caaruujuuwoo65.backend.dto.order.detail.OrderDetailDTO;
import caaruujuuwoo65.backend.dto.payment.details.PaymentDetailsDTO;
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
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private String status;
    private BigDecimal totalAmount;
    private List<OrderDetailDTO> orderDetails;
    private PaymentDetailsDTO paymentDetails;
}