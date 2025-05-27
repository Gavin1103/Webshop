package caaruujuuwoo65.backend.dto.token;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class UpdateTokenDTO {
    private String token;
    private LocalDateTime expirationDate;
}