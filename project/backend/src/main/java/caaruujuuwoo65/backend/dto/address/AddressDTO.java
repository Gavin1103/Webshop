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
    private String line1;
    private String city;
    private String country;
    private String postalCode;
    private String type;
}
