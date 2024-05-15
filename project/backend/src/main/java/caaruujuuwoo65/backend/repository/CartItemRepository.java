package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCartCartId(Long cartId);
    CartItem findByCartCartIdAndProductProductId(Long cartId, Long productId);
}