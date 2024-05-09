package caaruujuuwoo65.backend.model;

import caaruujuuwoo65.backend.dto.UserDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String email;

    private String firstname;

    private String lastname;

    private String phonenumber;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}