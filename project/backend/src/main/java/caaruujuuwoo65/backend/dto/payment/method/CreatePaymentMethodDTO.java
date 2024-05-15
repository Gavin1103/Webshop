package caaruujuuwoo65.backend.dto.payment.method;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating payment methods.
 * Used to transfer payment method creation data between client and server.
 */
@Getter
@Setter
public class CreatePaymentMethodDTO {
    @NotBlank(message = "Method is mandatory")
    private String method;
}