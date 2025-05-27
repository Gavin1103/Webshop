package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    /**
     * Retrieves a user by email.
     *
     * @param email the email address
     * @return a user with the specified email address
     */
    User findByEmail(String email);

    User findByUserId(Long userId);
}
