package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
}