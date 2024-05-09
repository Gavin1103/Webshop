package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.AdressDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import caaruujuuwoo65.backend.model.User;

@Entity
@Table(name = "adress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Adress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;

    private String streetname;

    private String zipcode;

    private String city;

    private String country;
}