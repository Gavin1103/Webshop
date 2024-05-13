package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.OrderedProducts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderedProductsRepository extends JpaRepository<OrderedProducts, Long> {

}