package caaruujuuwoo65.backend.seeder;

import caaruujuuwoo65.backend.model.Role;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.model.enums.RoleEnum;
import caaruujuuwoo65.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;


@Component
@Order(1)
public class DatabaseSeeder implements CommandLineRunner {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Create admin user
        User admin = new User();
        Role adminRole = new Role();
        adminRole.setName(RoleEnum.ADMIN);
        admin.setEmail("admin@admin.com");
        admin.setPassword(passwordEncoder.encode("admin"));
        admin.setRoles(new HashSet<>(Set.of(adminRole)));
        this.userRepository.save(admin);

        // Create normal user
        User user = new User();
        Role userRole = new Role();
        userRole.setName(RoleEnum.USER);
        user.setEmail("user@user.com");
        user.setPassword(passwordEncoder.encode("user"));
        admin.setRoles(new HashSet<>(Set.of(userRole)));
        this.userRepository.save(user);
    }
}