package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    List<Product> findTop10ByOrderByPriceAsc();

    @Query(value = "SELECT * FROM product ORDER BY RAND() LIMIT 10", nativeQuery = true)
    List<Product> findRandom10Products();
}