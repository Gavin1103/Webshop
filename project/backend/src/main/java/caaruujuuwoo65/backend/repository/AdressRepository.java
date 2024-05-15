package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdressRepository extends JpaRepository<Address, Long> {

}