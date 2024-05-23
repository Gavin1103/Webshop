package caaruujuuwoo65.backend.seeder;

import caaruujuuwoo65.backend.dto.user.CreateUserDTO;
import caaruujuuwoo65.backend.model.enums.RoleEnum;
import caaruujuuwoo65.backend.service.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class DatabaseSeeder implements CommandLineRunner {

    private final AuthenticationService authenticationService;

    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(AuthenticationService authenticationService, PasswordEncoder passwordEncoder) {
        this.authenticationService = authenticationService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        CreateUserDTO userDto = new CreateUserDTO(
            "User",
            "user@user.com",
            "0612345678",
            "user",
            "tester",
            "user"
        );

        this.authenticationService.register(userDto, RoleEnum.USER);

        CreateUserDTO adminDto = new CreateUserDTO(
            "Admin",
            "admin@admin.com",
            "0612345678",
            "admin",
            "tester",
            "admin"
        );
        this.authenticationService.register(adminDto, RoleEnum.ADMIN);
    }
}