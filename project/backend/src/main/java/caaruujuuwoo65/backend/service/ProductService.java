package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.ProductPreviewDTO;
import caaruujuuwoo65.backend.dto.product.ProductDTO;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import jakarta.persistence.criteria.Predicate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.jpa.domain.Specification;

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

    public List<ProductDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return products.stream()
            .map(product -> modelMapper.map(product, ProductDTO.class))
            .collect(Collectors.toList());
    }

    public List<ProductPreviewDTO> getTopDeals() {
        List<Product> products = productRepository.findTop10ByOrderByPriceAsc();
        return products.stream()
            .map(product -> modelMapper.map(product, ProductPreviewDTO.class))
            .collect(Collectors.toList());
    }

    public List<ProductPreviewDTO> getRecommendProducts() {
        List<Product> products = productRepository.findRandom10Products();
        return products.stream()
            .map(product -> modelMapper.map(product, ProductPreviewDTO.class))
            .collect(Collectors.toList());
    }

    public List<Product> getFilteredProducts(List<String> categories, Integer minPrice, Integer maxPrice, Integer minRating) {
        return productRepository.findAll((Specification<Product>) (root, query, criteriaBuilder) -> {
            var predicates = new ArrayList<Predicate>();

            if (categories != null && !categories.isEmpty()) {
                predicates.add(root.get("category").get("name").in(categories));
            }

            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
            }

            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
            }

            if (minRating != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.join("reviews").get("rating"), minRating));
            }


            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
    }
}
