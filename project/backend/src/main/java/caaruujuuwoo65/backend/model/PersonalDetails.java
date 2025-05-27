package caaruujuuwoo65.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "personal_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonalDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long personalDetailsId;

    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
}