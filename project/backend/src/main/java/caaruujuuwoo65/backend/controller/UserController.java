package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.user.UpdateUserDTO;
import caaruujuuwoo65.backend.config.PreAuthorizeAdmin;
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

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

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

    @PreAuthorizeAdmin()
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

    @PreAuthorizeAdmin()
    @PutMapping("/{id}")
    @Operation(summary = "Edit a user", description = "Edit a user in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User edited successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user details"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> editUser(@RequestBody UpdateUserDTO userDto, @PathVariable Long id) {
        User existingUser = userService.getUserById(id); // Check if user already exists
        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

        return userService.editUser(userDto, existingUser, false);
    }

    @PutMapping("/self")
    @Operation(summary = "Edit the current user", description = "Edit the current user in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User edited successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user details"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> editSelf(@RequestBody UpdateUserDTO userDto, HttpServletRequest request) {
        String id = this.jwtService.extractUserData(request, "sub");
        User existingUser = userService.getUserByEmail(id); // Check if user already exists
        if (existingUser == null) {
            return new ResponseEntity<>("User does not exist", HttpStatus.NOT_FOUND);
        }

        return userService.editUser(userDto, existingUser, false);
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

    @PreAuthorizeAdmin
    @DeleteMapping("/{email}")
    @Operation(summary = "Delete user by email", description = "Delete a user by email address")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User deleted successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<User> deleteUserByEmail(@PathVariable String email) {
        User users = userService.deleteUserByEmail(email);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}