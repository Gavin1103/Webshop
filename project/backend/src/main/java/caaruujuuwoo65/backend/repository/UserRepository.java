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

    /**
     * Retrieves a user by id.
     *
     * @param id the user id
     * @return a user with the specified id
     */
    User findById(int id);
}