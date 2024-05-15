package caaruujuuwoo65.backend.dto.payment.details;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Data Transfer Object for representing payment details in responses.
 * Used to transfer payment details information from server to client.
 */
@Getter
@Setter
public class PaymentDetailsDTO {
    private Long paymentDetailsId;
    private String paymentMethod;
    private String cardHolderName;
    private String cardNumber;
    private LocalDate expiryDate;
}