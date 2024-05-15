package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
        SELECT t 
        FROM Token t 
        INNER JOIN User u ON t.user.userId = u.userId 
        WHERE u.userId = :id 
        AND (t.expired = false OR t.revoked = false)
        """)
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);
}