package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.config.PreAuthorizeAdmin;
import caaruujuuwoo65.backend.dto.JwtRequest;
import caaruujuuwoo65.backend.dto.user.CreateUserDTO;
import caaruujuuwoo65.backend.model.enums.RoleEnum;
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
        return ResponseEntity.ok(authenticationService.register(user, RoleEnum.USER, false));
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

    @GetMapping("/confirm-account/{token}")
    @Operation(summary = "Confirm a user's account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully confirmed account"),
        @ApiResponse(responseCode = "400", description = "Invalid token")
    })
    public ResponseEntity<?> confirmAccount(@PathVariable String token) {
        return authenticationService.confirmUserAccount(token);
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Process a password reset request")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully processed request"),
        @ApiResponse(responseCode = "404", description = "User not found")
    })
    public ResponseEntity<?> processForgotPassword(@RequestParam String email) {
        return authenticationService.forgotPassword(email);
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset a user's password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully reset password"),
        @ApiResponse(responseCode = "400", description = "Invalid token")
    })
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String password) {
        return authenticationService.resetPassword(token, password);
    }


    @PreAuthorizeAdmin
    @GetMapping("/is-admin")
    public boolean isAdmin(){
        return true;
    }
}