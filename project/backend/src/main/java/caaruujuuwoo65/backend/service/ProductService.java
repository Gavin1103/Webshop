package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.ProductPreviewDTO;
import caaruujuuwoo65.backend.dto.product.ProductDTO;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
