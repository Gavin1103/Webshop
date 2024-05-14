package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

        /**
     * Retrieves a product by id.
     *
     * @param id the product id
     * @return a product with the specified id
     */
    Product findById(int id);
}