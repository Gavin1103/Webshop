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
public class PersonalDetailsDTO {
    private Long personalDetailsId;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}