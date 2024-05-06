package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.JwtRequest;
import caaruujuuwoo65.backend.dto.JwtResponse;
import caaruujuuwoo65.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationService(UserService userService, @Lazy JwtService jwtService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
    }


    /**
     * Authenticates a user and generates a JWT token.
     *
     * @param authenticationRequest the authentication request containing the user's email and password
     * @return a ResponseEntity containing a JwtResponse with the JWT token if authentication is successful,
     *         or an error message with an appropriate HTTP status code if authentication fails
     */
    public ResponseEntity<?> authenticate(JwtRequest authenticationRequest) {

        final User user = userService.getUserByEmail(authenticationRequest.getEmail());

        if (user == null) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("authorities", user.getAuthoritiesList());

        final String token = jwtService.generateToken(extraClaims, user);

        return new ResponseEntity<>(new JwtResponse(token), HttpStatus.OK);
    }
}