package caaruujuuwoo65.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    @NotBlank(message = "Username is mandatory")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone number is mandatory")
    private String phoneNumber;

    @NotBlank(message = "First name is mandatory")
    private String firstname;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String lastname;

    @NotBlank(message = "Password is mandatory")
    private String password;
}