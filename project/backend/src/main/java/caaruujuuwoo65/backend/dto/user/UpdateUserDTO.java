package caaruujuuwoo65.backend.dto.user;

import caaruujuuwoo65.backend.model.enums.RoleEnum;
import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for updating an existing user.
 * Used to transfer user update data between client and server.
 */
@Getter
@Setter
public class UpdateUserDTO {
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phonenumber;
    private RoleEnum roleName;
    private Long addressId;
    private String password;
}