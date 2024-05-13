package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.UserEditDto;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.service.JwtService;
import caaruujuuwoo65.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    @Autowired
    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/")
    @Operation(summary = "Get all users", description = "Get all users from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{email}")
    @Operation(summary = "Edit a user", description = "Edit a user in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User edited successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user details"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> editUser(@RequestBody UserEditDto userDto, @PathVariable String email) {
        return userService.editUser(userDto, email, true);
    }

    @PutMapping("/self")
    @Operation(summary = "Edit the current user", description = "Edit the current user in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User edited successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user details"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> editSelf(@RequestBody UserEditDto userDto, HttpServletRequest request) {
        String id = this.jwtService.extractUserData(request, "sub");
        return userService.editUser(userDto, id, false);
    }

    @GetMapping("/{email}")
    @Operation(summary = "Get user by email", description = "Get a user by email address")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        User users = userService.getUserByEmail(email);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
