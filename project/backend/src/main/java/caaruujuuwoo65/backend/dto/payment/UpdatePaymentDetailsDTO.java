package caaruujuuwoo65.backend.dto.payment;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Data Transfer Object for updating payment details.
 * Used to transfer payment details update data between client and server.
 */
@Getter
@Setter
public class UpdatePaymentDetailsDTO {
    @NotBlank(message = "Card holder name is mandatory")
    private String cardHolderName;

    @NotBlank(message = "Card number is mandatory")
    private String cardNumber;

    @NotNull(message = "Expiry date is mandatory")
    private LocalDate expiryDate;

    @NotBlank(message = "Payment method is mandatory")
    private String paymentMethod;
}