package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.user.UpdateUserDTO;
import caaruujuuwoo65.backend.model.Role;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.ConfirmationTokenRepository;
import caaruujuuwoo65.backend.repository.RoleRepository;
import caaruujuuwoo65.backend.repository.TokenRepository;
import caaruujuuwoo65.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final ConfirmationTokenRepository confirmationToken;
    private final RoleRepository roleRepository;

    @Autowired
    public UserService(ModelMapper modelMapper, UserRepository userRepository, PasswordEncoder passwordEncoder, TokenRepository tokenRepository, ConfirmationTokenRepository confirmationToken, RoleRepository roleRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
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
        User user = modelMapper.map(userDto, User.class);

        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        } else {
            user.setPassword(existingUser.getPassword());
        }

        if (changeRoles) {
            Role role = new Role();
            role.setName(userDto.getRoleName());
            role.setUser(user);
            user.setRoles(Set.of(role));
        } else {
            user.setRoles(existingUser.getRoles());
        }

        user.setEnabled(existingUser.isEnabled());
        user.setCarts(existingUser.getCarts());
        user.setUserId(existingUser.getUserId());
        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
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

        if (user != null) {
            tokenRepository.deleteByUser_UserId(user.getUserId());
            confirmationToken.deleteByUser_UserId(user.getUserId());
        }

        userRepository.delete(user);
        return user;
    }

}