package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CreateUserDTO;
import caaruujuuwoo65.backend.dto.JwtRequest;
import caaruujuuwoo65.backend.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @Autowired
    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    @Operation(summary = "Authenticate a user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully authenticated"),
        @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) {
        return authenticationService.authenticate(authenticationRequest);
    }

    @PostMapping(value = "/register")
    @Operation(summary = "Register a new user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Successfully registered"),
        @ApiResponse(responseCode = "409", description = "User already exists")
    })
    public ResponseEntity<?> register(@RequestBody CreateUserDTO user) throws Exception {
        return ResponseEntity.ok(authenticationService.register(user));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh the JWT token")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully refreshed token"),
        @ApiResponse(responseCode = "401", description = "Invalid token")
    })
    public ResponseEntity<?> refreshToken(HttpServletRequest request) {
        return this.authenticationService.refreshToken(request);
    }
}