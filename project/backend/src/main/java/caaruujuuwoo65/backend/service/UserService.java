package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.UserDTO;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

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
     * Saves a new user.
     *
     * @param userDto the user data transfer object
     * @return the saved user
     */
    public User saveUser(UserDTO userDto) {
        User user = modelMapper.map(userDto, User.class);

        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        return userRepository.save(user);
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
}