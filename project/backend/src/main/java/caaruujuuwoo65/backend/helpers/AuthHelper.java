package caaruujuuwoo65.backend.helpers;

import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class AuthHelper {
    private final UserRepository userRepository;

    @Autowired
    public AuthHelper(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Helper method to get the current authenticated user.
     *
     * @return the current user
     */
    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {
            username = principal.toString();
        }
        return userRepository.findByEmail(username);
    }
}
