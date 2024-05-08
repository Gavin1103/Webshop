package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.UserEditDto;
import caaruujuuwoo65.backend.model.User;
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
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * Retrieves all users.
     *
     * @return a list of all users
     */
    public List<caaruujuuwoo65.backend.model.User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Edits a user.
     *
     * @param userDto the user data transfer object
     * @param email the email address
     * @param changeRoles whether to change the user's roles
     * @return the edited user
     */
    public ResponseEntity<?> editUser(UserEditDto userDto, String email, boolean changeRoles) {
        User user = modelMapper.map(userDto, User.class);

        User existingUser = this.getUserByEmail(email); // Check if user already exists
        user.setId(existingUser.getId());

        if(existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

        if(!changeRoles){
            user.setRoles(existingUser.getRoles());
        }

        if(userDto.getPassword() != null && !userDto.getPassword().isEmpty()){
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