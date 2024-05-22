package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.CustomerOrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerOrderDetailRepository extends JpaRepository<CustomerOrderDetail, Long> {
}