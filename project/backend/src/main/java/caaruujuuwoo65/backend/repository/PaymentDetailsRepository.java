package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.PaymentDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailsRepository extends JpaRepository<PaymentDetails, Long> {

}