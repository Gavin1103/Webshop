package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.ConfirmationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConfirmationTokenRepository extends JpaRepository<ConfirmationToken, Long> {
    ConfirmationToken findByConfirmationToken(String confirmationToken);
    void deleteByUser_UserId(Long id);
}
