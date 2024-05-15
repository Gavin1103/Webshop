package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByUser(User user);

    Optional<Order> findByOrderIdAndUser(Long orderId, User user);
}