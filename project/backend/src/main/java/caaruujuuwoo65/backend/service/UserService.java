package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.user.UpdateUserDTO;
import caaruujuuwoo65.backend.model.Address;
import caaruujuuwoo65.backend.model.ConfirmationToken;
import caaruujuuwoo65.backend.model.Role;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final ConfirmationTokenRepository confirmationToken;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository, ConfirmationTokenRepository confirmationToken, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.confirmationToken = confirmationToken;
        this.roleRepository = roleRepository;
    }

    /**
     * Retrieves all users.
     *
     * @return a list of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Edits a user.
     *
     * @param userDto     the user data transfer object
     * @param changeRoles whether to change the user's roles
     * @return the edited user
     */
    public ResponseEntity<?> editUser(UpdateUserDTO userDto, User existingUser, boolean changeRoles) {
        existingUser.setFirstname(userDto.getFirstname());
        existingUser.setLastname(userDto.getLastname());
        existingUser.setEmail(userDto.getEmail());
        existingUser.setPhonenumber(userDto.getPhonenumber());

        if (userDto.getAddressId() != null) {
            Address address = addressRepository.findById(userDto.getAddressId()).orElse(null);
            if (address != null) {
                existingUser.setAddress(address);
            } else {
                return new ResponseEntity<>("Address not found", HttpStatus.NOT_FOUND);
            }
        }

        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        if (changeRoles) {
            existingUser.setRoles(roleRepository.findByName(userDto.getRoleName()));
        }

        return new ResponseEntity<>(userRepository.save(existingUser), HttpStatus.OK);
    }

    /**
     * Retrieves a user by email.
     *
     * @param email the email address
     * @return a user with the specified email address
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserById(long id) {
        return userRepository.findByUserId(id);
    }

    /**
     * Deletes a user by email.
     *
     * @param email the email address
     * @return the deleted user
     */
    public User deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        if(user != null) {
            tokenRepository.deleteByUser_UserId(user.getUserId());
            confirmationToken.deleteByUser_UserId(user.getUserId());
        }

        userRepository.delete(user);
        return user;
    }

}