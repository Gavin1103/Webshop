package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.PersonalDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {

}