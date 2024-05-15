package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.address.AddressDTO;
import caaruujuuwoo65.backend.dto.address.CreateAddressDTO;
import caaruujuuwoo65.backend.dto.address.UpdateAddressDTO;
import caaruujuuwoo65.backend.helpers.AuthHelper;
import caaruujuuwoo65.backend.model.Address;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.AddressRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing user addresses
 */
@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;
    private final AuthHelper authHelper;

    @Autowired
    public AddressService(AddressRepository addressRepository, ModelMapper modelMapper, AuthHelper authHelper) {
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
        this.authHelper = authHelper;
    }

    /**
     * Retrieves all addresses for the current user.
     *
     * @return a list of all addresses for the current user
     */
    public List<AddressDTO> getAllAddressesForCurrentUser() {
        User currentUser = authHelper.getCurrentUser();
        return addressRepository.findByUser(currentUser).stream()
            .map(address -> modelMapper.map(address, AddressDTO.class))
            .collect(Collectors.toList());
    }

    /**
     * Creates a new address for the current user.
     *
     * @param createAddressDTO the address data transfer object
     * @return the created address
     */
    public ResponseEntity<AddressDTO> createAddress(CreateAddressDTO createAddressDTO) {
        User currentUser = authHelper.getCurrentUser();
        Address address = modelMapper.map(createAddressDTO, Address.class);
        address.setUser(currentUser);
        Address savedAddress = addressRepository.save(address);
        AddressDTO addressDTO = modelMapper.map(savedAddress, AddressDTO.class);
        return new ResponseEntity<>(addressDTO, HttpStatus.CREATED);
    }

    /**
     * Updates an existing address for the current user.
     *
     * @param addressId        the address id
     * @param updateAddressDTO the address data transfer object
     * @return the updated address
     */
    public ResponseEntity<AddressDTO> updateAddress(Long addressId, UpdateAddressDTO updateAddressDTO) {
        User currentUser = authHelper.getCurrentUser();
        return addressRepository.findByAddressIdAndUser(addressId, currentUser)
            .map(address -> {
                modelMapper.map(updateAddressDTO, address);
                Address updatedAddress = addressRepository.save(address);
                AddressDTO addressDTO = modelMapper.map(updatedAddress, AddressDTO.class);
                return new ResponseEntity<>(addressDTO, HttpStatus.OK);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Deletes an address for the current user.
     *
     * @param addressId the address id
     * @return response entity
     */
    public ResponseEntity<Void> deleteAddress(Long addressId) {
        User currentUser = authHelper.getCurrentUser();
        return addressRepository.findByAddressIdAndUser(addressId, currentUser)
            .map(address -> {
                addressRepository.delete(address);
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}