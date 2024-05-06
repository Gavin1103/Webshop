package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.UserDTO;
import caaruujuuwoo65.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    @Operation(summary = "Add a new user", description = "Add a new user to the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User added successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid user details"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<caaruujuuwoo65.backend.model.User> addUser(@RequestBody UserDTO userDto) {
        caaruujuuwoo65.backend.model.User savedUser = userService.saveUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/")
    @Operation(summary = "Get all users", description = "Get all users from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Users retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<caaruujuuwoo65.backend.model.User>> getAllUsers() {
        List<caaruujuuwoo65.backend.model.User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{email}")
    @Operation(summary = "Get user by email", description = "Get a user by email address")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "User retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "User not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<caaruujuuwoo65.backend.model.User> getUserByEmail(@PathVariable String email) {
        caaruujuuwoo65.backend.model.User users = userService.getUserByEmail(email);
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
