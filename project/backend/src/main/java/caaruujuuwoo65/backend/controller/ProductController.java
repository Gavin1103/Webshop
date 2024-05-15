package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.ProductDTO;
import caaruujuuwoo65.backend.mapper.ProductMapper;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Autowired
    public ProductController(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductDTO> dtos = products.stream()
            .map(productMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/topDeals")
    public ResponseEntity<List<ProductDTO>> getTopDeals() {
        List<Product> products = productRepository.findTop10ByOrderByPriceAsc();
        List<ProductDTO> dtos = products.stream()
            .map(productMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<ProductDTO>> getRecommendProducts() {
        List<Product> products = productRepository.findRandom10Products();
        List<ProductDTO> dtos = products.stream()
            .map(productMapper::toDTO)
            .collect(Collectors.toList());
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }



}
