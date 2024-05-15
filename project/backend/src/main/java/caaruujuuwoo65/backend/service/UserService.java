package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.UserEditDto;
import caaruujuuwoo65.backend.model.User;
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

@Service
@Transactional
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.tokenRepository = tokenRepository;
        this.passwordEncoder = passwordEncoder;
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
    public ResponseEntity<?> editUser(UserEditDto userDto, String email, boolean changeRoles) {
        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

        User user = modelMapper.map(userDto, User.class);
        user.setId(existingUser.getId());
        user.setCreatedAt(existingUser.getCreatedAt());

        if (!changeRoles) {
            user.setRoles(existingUser.getRoles());
        }

        if (userDto.getPassword() != null && !userDto.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        }

        return new ResponseEntity<>(userRepository.save(user), HttpStatus.OK);
    }

    /**
     * Retrieves a user by email.
     *
     * @param email the email address
     * @return a list of users with the specified email address
     */
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        if(user != null) {
            tokenRepository.deleteByUser_Id(user.getId());
        }

        userRepository.delete(user);
        return user;
    }

    /**
     * Retrieves a user by id.
     *
     * @param id the user id
     * @return a user with the specified id
     */
    public User getById(String id) {
        return userRepository.findById(Integer.parseInt(id));
    }
}