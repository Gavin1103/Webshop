package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
public class UserDto {
    private String username;
    private String email;
    private String phonenumber;
    private String firstname;
    private String lastname;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String password;
}