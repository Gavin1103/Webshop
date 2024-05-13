package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.User;


@Getter
@Setter
public class AdressDTO {
    private User user;
    private String streetname;
    private String zipcode;
    private String city;
    private String country;
}