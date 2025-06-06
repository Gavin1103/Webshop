package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.CustomerOrder;
import caaruujuuwoo65.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerOrderRepository extends JpaRepository<CustomerOrder, Long> {
    Optional<CustomerOrder> findByOrderId(Long orderId);
}