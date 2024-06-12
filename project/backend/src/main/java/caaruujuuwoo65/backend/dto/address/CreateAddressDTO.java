package caaruujuuwoo65.backend.dto.address;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new address.
 * Used to transfer address creation data between client and server.
 */
@Getter
@Setter
public class CreateAddressDTO {
    @NotBlank(message = "Address line1 is mandatory")
    private String line1;

    @NotBlank(message = "City is mandatory")
    private String city;

    @NotBlank(message = "Country is mandatory")
    private String country;

    @NotBlank(message = "Postal code is mandatory")
    private String postalCode;
}