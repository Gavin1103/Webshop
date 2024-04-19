package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.UserDTO;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository, ModelMapper modelMapper) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
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
     * Saves a new user.
     *
     * @param userDto the user data transfer object
     * @return the saved user
     */
    public User saveUser(UserDTO userDto) {
        User user = modelMapper.map(userDto, User.class);
        return userRepository.save(user);
    }

    /**
     * Retrieves a user by email.
     *
     * @param email the email address
     * @return a list of users with the specified email address
     */
    public List<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}