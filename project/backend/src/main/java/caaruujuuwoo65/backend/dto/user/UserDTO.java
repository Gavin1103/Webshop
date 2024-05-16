package caaruujuuwoo65.backend.dto.user;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for representing user data in responses.
 * Used to transfer user information from server to client, excluding sensitive information.
 */
@Getter
@Setter
public class UserDTO {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phonenumber;
    private Long addressId;
    private String password;
}
