package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductRepository productRepository;

    @Autowired
    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productRepository.findAll();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/topDeals")
    public ResponseEntity<List<Product>> getTopDeals() {
        List<Product> products = productRepository.findTop10ByOrderByPriceAsc();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    public ResponseEntity<List<Product>> getRecommendProducts() {
        List<Product> products = productRepository.findRandom10Products();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

}
