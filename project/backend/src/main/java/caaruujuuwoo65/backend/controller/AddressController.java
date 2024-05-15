package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.address.AddressDTO;
import caaruujuuwoo65.backend.dto.address.CreateAddressDTO;
import caaruujuuwoo65.backend.dto.address.UpdateAddressDTO;
import caaruujuuwoo65.backend.service.AddressService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    @Autowired
    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    /**
     * Retrieves all addresses for the current user.
     *
     * @return a list of all addresses for the current user
     */
    @GetMapping("/")
    @Operation(summary = "Get all addresses for the current user", description = "Get all addresses from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Addresses retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<AddressDTO>> getAllAddressesForCurrentUser() {
        List<AddressDTO> addresses = addressService.getAllAddressesForCurrentUser();
        return new ResponseEntity<>(addresses, HttpStatus.OK);
    }

    /**
     * Creates a new address for the current user.
     *
     * @param createAddressDTO the address data transfer object
     * @return the created address
     */
    @PostMapping("/")
    @Operation(summary = "Create a new address for the current user", description = "Create a new address in the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Address created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid address details"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<AddressDTO> createAddress(@Validated @RequestBody CreateAddressDTO createAddressDTO) {
        return addressService.createAddress(createAddressDTO);
    }

    /**
     * Updates an existing address for the current user.
     *
     * @param addressId        the address id
     * @param updateAddressDTO the address data transfer object
     * @return the updated address
     */
    @PutMapping("/{addressId}")
    @Operation(summary = "Update an existing address for the current user", description = "Update an existing address in the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Address updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid address details"),
        @ApiResponse(responseCode = "404", description = "Address not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<AddressDTO> updateAddress(@PathVariable Long addressId, @Validated @RequestBody UpdateAddressDTO updateAddressDTO) {
        return addressService.updateAddress(addressId, updateAddressDTO);
    }

    /**
     * Deletes an address for the current user.
     *
     * @param addressId the address id
     * @return response entity
     */
    @DeleteMapping("/{addressId}")
    @Operation(summary = "Delete an address for the current user", description = "Delete an address from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Address deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Address not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deleteAddress(@PathVariable Long addressId) {
        return addressService.deleteAddress(addressId);
    }
}
