package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {

}