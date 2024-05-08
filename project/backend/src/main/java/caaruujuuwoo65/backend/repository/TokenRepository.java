package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
        SELECT Token 
        FROM Token 
        INNER JOIN User ON Token.user.id = User.id 
        WHERE User.id = :id 
        AND (Token.expired = false OR Token.revoked = false)
        """)
    List<Token> findAllValidTokenByUser(Integer id);

    Optional<Token> findByToken(String token);
}