package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.config.PreAuthorizeAdmin;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {



    @PreAuthorizeAdmin()
    @GetMapping("/")
    @Operation(summary = "Admin example endpoint")
    public ResponseEntity<String> admin() {
        return new ResponseEntity<>("Welcome Admin!", HttpStatus.OK);
    }
}
