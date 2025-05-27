package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Role;
import caaruujuuwoo65.backend.model.enums.RoleEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Set<Role> findByName(RoleEnum name);
}
