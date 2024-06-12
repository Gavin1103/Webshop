package caaruujuuwoo65.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new address.
 * Used to transfer address creation data between client and server.
 */
@Getter
@Setter
public class CreatePersonalDetailsDTO {
    @NotBlank(message = "First name is mandatory")
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    private String lastName;

    @Email(message = "Email should be valid")
    private String email;

    private String phoneNumber;
}