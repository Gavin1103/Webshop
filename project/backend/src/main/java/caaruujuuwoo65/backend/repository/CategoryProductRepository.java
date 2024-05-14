package caaruujuuwoo65.backend.repository;

import caaruujuuwoo65.backend.model.CategoryProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;

@Repository
public interface CategoryProductRepository extends JpaRepository<CategoryProduct, Long> {

    @Query("SELECT c FROM CategoryProduct c JOIN FETCH c.products")
    List<CategoryProduct> findAllWithProducts();

    @Query(value = "SELECT * FROM category_product ORDER BY RAND() LIMIT :count", nativeQuery = true)
    List<CategoryProduct> findRandomCategories(@Param("count") int count);

    @Query(value = "SELECT cp FROM CategoryProduct cp JOIN cp.products p GROUP BY cp.id ORDER BY COUNT(p) DESC")
    List<CategoryProduct> findCategoryWithMostProducts(Pageable pageable);
}