package caaruujuuwoo65.backend.dto.address;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for representing address data in responses.
 * Used to transfer address information from server to client.
 */
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