package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Integer> {

    @Query("SELECT c FROM ProductCategory c JOIN FETCH c.products")
    List<ProductCategory> findAllWithProducts();

    @Query(value = "SELECT * FROM category_product ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<ProductCategory> findRandomCategories(@Param("count") int count);

}