package caaruujuuwoo65.backend.dto.user;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new user.
 * Used to transfer user creation data between client and server.
 */
@Getter
@Setter
public class CreateUserDTO {
    private String firstname;
    private String lastname;
    private String email;
    private String phonenumber;
    private String password;
}
