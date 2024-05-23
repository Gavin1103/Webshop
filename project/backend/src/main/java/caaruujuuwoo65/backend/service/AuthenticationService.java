package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.AuthenticationResponse;
import caaruujuuwoo65.backend.dto.JwtRequest;
import caaruujuuwoo65.backend.dto.user.CreateUserDTO;
import caaruujuuwoo65.backend.model.ConfirmationToken;
import caaruujuuwoo65.backend.model.Role;
import caaruujuuwoo65.backend.model.Token;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.model.enums.RoleEnum;
import caaruujuuwoo65.backend.model.enums.TokenType;
import caaruujuuwoo65.backend.repository.ConfirmationTokenRepository;
import caaruujuuwoo65.backend.repository.TokenRepository;
import caaruujuuwoo65.backend.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final JwtService jwtService;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final TokenRepository tokenRepository;
    private final ConfirmationTokenRepository confirmationTokenRepository;

    @Autowired
    public AuthenticationService(UserService userService, @Lazy JwtService jwtService, PasswordEncoder passwordEncoder, TokenRepository tokenRepository, ModelMapper modelMapper, UserRepository userRepository, ConfirmationTokenRepository confirmationTokenRepository) {
        this.userRepository = userRepository;
        this.modelMapper = modelMapper;
        this.jwtService = jwtService;
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.tokenRepository = tokenRepository;
        this.confirmationTokenRepository = confirmationTokenRepository;
    }


    /**
     * Authenticates a user and generates a JWT token.
     *
     * @param authenticationRequest the authentication request containing the user's email and password
     * @return a ResponseEntity containing a JwtResponse with the JWT token if authentication is successful,
     * or an error message with an appropriate HTTP status code if authentication fails
     */
    public ResponseEntity<?> authenticate(JwtRequest authenticationRequest) {

        final User user = userService.getUserByEmail(authenticationRequest.getEmail());

        if (user == null) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(authenticationRequest.getPassword(), user.getPassword())) {
            return new ResponseEntity<>("Invalid credentials", HttpStatus.UNAUTHORIZED);
        }

        if(!user.isEnabled()){
            return new ResponseEntity<>("Account not confirmed", HttpStatus.FORBIDDEN);
        }

        Map<String, Object> extraClaims = new HashMap<>();
        extraClaims.put("authorities", user.getAuthoritiesList());

        final String token = jwtService.generateToken(extraClaims, user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, token);

        return new ResponseEntity<>(AuthenticationResponse.builder()
            .accessToken(token)
            .refreshToken(refreshToken)
            .build(), HttpStatus.OK);
    }

    /**
     * Saves a new user.
     *
     * @param userDto the user data transfer object
     * @return the saved user
     */
    public ResponseEntity<?> register(CreateUserDTO userDto, RoleEnum roleEnum, boolean setEnabled) {
        User user = modelMapper.map(userDto, User.class);

        User existingUser = this.userService.getUserByEmail(user.getEmail()); // Check if user already exists

        if (existingUser != null) {
            return new ResponseEntity<>("User already exists", HttpStatus.CONFLICT);
        }

        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Role userRole = new Role();
        userRole.setName(roleEnum);
        userRole.setUser(user);
        user.setRoles(new HashSet<>(Set.of(userRole)));

        User savedUser = userRepository.save(user);

        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        saveUserToken(savedUser, jwtToken);

        ConfirmationToken confirmationToken = new ConfirmationToken(savedUser);
        confirmationTokenRepository.save(confirmationToken);

        return new ResponseEntity<>(AuthenticationResponse.builder()
            .accessToken(jwtToken)
            .refreshToken(refreshToken)
            .confirmationToken(confirmationToken.getConfirmationToken())
            .build(), HttpStatus.CREATED);
    }

    /**
     * Saves the user's token.
     *
     * @param user     the user
     * @param jwtToken the JWT token
     */
    private void saveUserToken(User user, String jwtToken) {
        var token = Token.builder()
            .user(user)
            .token(jwtToken)
            .tokenType(TokenType.BEARER)
            .expired(false)
            .revoked(false)
            .build();
        tokenRepository.save(token);
    }

    /**
     * Revokes all tokens for a user.
     *
     * @param user the user
     */
    private void revokeAllUserTokens(User user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getUserId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

    /**
     * Refreshes the JWT token.
     *
     * @param request the HTTP request
     * @return
     * @throws IOException if an I/O error occurs
     */
    public ResponseEntity<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return null;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail == null) {
            return null;
        }

        var user = this.userService.getUserByEmail(userEmail);

        if (user == null) {
            throw new BadCredentialsException("Invalid credentials");
        }

        if (jwtService.isTokenValid(refreshToken, user)) {
            var accessToken = jwtService.generateToken(user);
            revokeAllUserTokens(user);
            saveUserToken(user, accessToken);

            return new ResponseEntity<>(AuthenticationResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .build(), HttpStatus.OK);
        }
        return null;
    }

    public ResponseEntity<?> confirmUserAccount(String confirmationToken) {
        ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);

        if (token != null) {
            User user = userService.getUserByEmail(token.getUser().getEmail());
            user.setEnabled(true);
            userRepository.save(user);
            return new ResponseEntity<>("Account confirmed successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("The link is invalid or broken!", HttpStatus.BAD_REQUEST);
        }
    }
}