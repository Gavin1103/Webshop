package caaruujuuwoo65.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
public class UserDto {
    private String username;
    private String email;
    private String phoneNumber;
    private String firstname;
    private String lastname;
    private String password;
}