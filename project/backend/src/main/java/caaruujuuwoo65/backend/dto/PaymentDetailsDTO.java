package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class PaymentDetailsDTO {
    private Long paymentDetailsId;
    private Long orderId;
    private Long paymentMethodId;
    private String cardHolderName;
    private String cardNumber;
    private LocalDate expiryDate;
}