package caaruujuuwoo65.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/")
    @Operation(summary = "Hello world.")
    @ResponseStatus(HttpStatus.OK)
    public String helloworld() {
        return "Hello, world!";
    }
}
