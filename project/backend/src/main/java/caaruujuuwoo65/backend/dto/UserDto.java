package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
public class UserDto {
    private Long userId;
    private String firstname;
    private String lastname;
    private String email;
    private String phoneNumber;
    private AddressDTO address;
    private String password;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}