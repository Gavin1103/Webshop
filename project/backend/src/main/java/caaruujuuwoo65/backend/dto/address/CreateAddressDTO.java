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
    @NotBlank(message = "Street is mandatory")
    private String street;

    @NotBlank(message = "City is mandatory")
    private String city;

    private String state;

    @NotBlank(message = "Postal code is mandatory")
    private String postalCode;

    @NotBlank(message = "Country is mandatory")
    private String country;

    @NotBlank(message = "User ID is mandatory")
    private Long userId;
}