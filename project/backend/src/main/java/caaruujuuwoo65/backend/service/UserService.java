package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.user.UpdateUserDTO;
import caaruujuuwoo65.backend.model.Address;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.AddressRepository;
import caaruujuuwoo65.backend.repository.TokenRepository;
import caaruujuuwoo65.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final AddressRepository addressRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserService(UserRepository userRepository, AddressRepository addressRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.addressRepository = addressRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
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
     * @param email       the email address
     * @param changeRoles whether to change the user's roles
     * @return the edited user
     */
    public ResponseEntity<?> editUser(UpdateUserDTO userDto, String email, boolean changeRoles) {
        User existingUser = this.getUserByEmail(email); // Check if user already exists
        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

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

        if (!changeRoles) {
            existingUser.setRoles(existingUser.getRoles());
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

    public User deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        if(user != null) {
            tokenRepository.deleteByUser_UserId(user.getUserId());
        }


        userRepository.delete(user);
        return user;
    }

}