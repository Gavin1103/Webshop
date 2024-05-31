package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.product.*;
import caaruujuuwoo65.backend.dto.product.category.CategoryPreviewDTO;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ProductService(ProductRepository productRepository, ModelMapper modelMapper) {
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
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


    public List<ProductAverageRatingDTO> getFilteredProducts(List<String> categories, Integer minPrice, Integer maxPrice, Integer minRating, String name) {
        List<Product> filteredProducts = productRepository.findAll((Specification<Product>) (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.get("category").get("categoryName").in(categories));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (name != null && !name.isEmpty()) {
                predicates.add(criteriaBuilder.like(criteriaBuilder.lower(root.get("productName")), "%" + name.toLowerCase() + "%"));
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
}
