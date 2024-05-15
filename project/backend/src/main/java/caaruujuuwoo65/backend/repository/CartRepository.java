package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUserUserId(Long userId);
}