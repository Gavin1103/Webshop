package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.product.*;
import caaruujuuwoo65.backend.dto.product.category.CategoryPreviewDTO;
import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.model.ProductCategory;
import caaruujuuwoo65.backend.repository.ProductCategoryRepository;
import caaruujuuwoo65.backend.repository.ProductRepository;
import jakarta.persistence.TypedQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.Predicate;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductCategoryRepository productCategoryRepository;
    private final ModelMapper modelMapper;
    private final EntityManager entityManager;


    @Autowired
    public ProductService(
        ProductRepository productRepository,
        ProductCategoryRepository productCategoryRepository,
        ModelMapper modelMapper,
        EntityManager entityManager
    ) {
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.modelMapper = modelMapper;
        this.entityManager = entityManager;
    }

    @Transactional
    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        products.forEach(product -> {
            Hibernate.initialize(product.getImage());
        });
        return products.stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());

    }

    public List<ProductPreviewDTO> getTopDeals() {
        List<Product> products = productRepository.findAll();
        return products.stream()
            .filter(Product::isOnSale)
            .map(product -> modelMapper.map(product, ProductPreviewDTO.class))
            .collect(Collectors.toList());
    }

    public List<ProductPreviewDTO> getRecommendProducts() {
        List<Product> products = productRepository.findRandom10Products();
        return products.stream()
            .map(product -> modelMapper.map(product, ProductPreviewDTO.class))
            .collect(Collectors.toList());
    }


    public List<ProductAverageRatingDTO> getFilteredProducts(List<String> categories, Integer minPrice, Integer maxPrice, Integer minRating, String name, boolean isDiscounted) {
        List<Product> filteredProducts = productRepository.findAll((Specification<Product>) (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.get("category").get("categoryName").in(categories));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("currentPrice"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("currentPrice"), maxPrice));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + name.toLowerCase() + "%"));
            }

            if (isDiscounted) {
                predicates.add(criteriaBuilder.notEqual(root.get("currentPrice"), root.get("originalPrice")));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });

        // Filter products by minimum rating
        if (minRating != null) {
            filteredProducts = filteredProducts.stream()
                .filter(product -> product.getAverageRating() >= minRating)
                .toList();
        }

        return filteredProducts.stream()
            .map(product -> modelMapper.map(product, ProductAverageRatingDTO.class))
            .collect(Collectors.toList());
    }


    public ProductDTO getProductById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product != null ? modelMapper.map(product, ProductDTO.class) : null;
    }

    public List<ProductSearchResultDTO> searchProducts(String keyword) {
        List<Product> products = productRepository.searchProducts(keyword);
        return products.stream()
            .map(product -> modelMapper.map(product, ProductSearchResultDTO.class))
            .collect(Collectors.toList());
    }

    public List<CategoryPreviewDTO> getCategoriesByProductName(String name) {
        List<Product> products = productRepository.findByProductNameContainingIgnoreCase(name);
        return products.stream()
            .map(Product::getCategory)
            .distinct()
            .map(category -> modelMapper.map(category, CategoryPreviewDTO.class))
            .collect(Collectors.toList());
    }

    public Product createProduct(CreateProductDTO productDTO) {
        Product product = modelMapper.map(productDTO, Product.class);
        return productRepository.save(product);
    }

    public List<CategoryPreviewDTO> getCategoriesWithDiscountedProducts() {
        String jpql = "SELECT DISTINCT p.category FROM Product p WHERE p.currentPrice < p.originalPrice";
        TypedQuery<ProductCategory> query = entityManager.createQuery(jpql, ProductCategory.class);
        List<ProductCategory> discountedCategories = query.getResultList();
        return discountedCategories.stream()
            .map(productCategory -> modelMapper.map(productCategory, CategoryPreviewDTO.class))
            .collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO updateProduct(Long productId, ProductDTO updateProductDTO) {
        Product existingProduct = productRepository.findById(productId).orElse(null);
        if (existingProduct == null) {
            return null;
        }

        existingProduct.setProductName(updateProductDTO.getName());
        existingProduct.setDescription(updateProductDTO.getDescription());
        existingProduct.setImage(updateProductDTO.getImage());
        existingProduct.setCurrentPrice(BigDecimal.valueOf(updateProductDTO.getCurrentPrice()));
        existingProduct.setOriginalPrice(BigDecimal.valueOf(updateProductDTO.getOriginalPrice()));
        existingProduct.setStock(updateProductDTO.getStock());

        if (updateProductDTO.getProductCategory() != null) {
            ProductCategoryDTO categoryDTO = updateProductDTO.getProductCategory();
            Long categoryId = categoryDTO.getId();
            ProductCategory category = productCategoryRepository.findById(categoryId).orElse(null);
            if (category != null) {
                existingProduct.setCategory(category);
            }
        }

        existingProduct = productRepository.save(existingProduct);

        return modelMapper.map(existingProduct, ProductDTO.class);
    }

    public ProductReviewsDTO getProductWithReviewsById(long id) {
        Product product = productRepository.findById(id).orElse(null);
        return product != null ? modelMapper.map(product, ProductReviewsDTO.class) : null;
    }

}
