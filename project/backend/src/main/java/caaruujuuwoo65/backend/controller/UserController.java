package caaruujuuwoo65.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/")
    @Operation(summary = "Hello world!", description = "Returns a hello world message")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Hello world message returned successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public String helloworld() {
        return "Hello, world!";
    }
}
