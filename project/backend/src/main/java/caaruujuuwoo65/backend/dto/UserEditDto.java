package caaruujuuwoo65.backend.dto;

import caaruujuuwoo65.backend.model.enums.Role;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class UserEditDto {
    private String username;
    private String email;
    private String password;
    private Set<Role> roles;
}
