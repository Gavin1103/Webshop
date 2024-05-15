package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.User;


@Getter
@Setter
public class AddressDTO {
    private Long addressId;
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}