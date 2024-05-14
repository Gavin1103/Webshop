package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CategoryDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.model.CategoryProduct;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.CategoryProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping ("/categories")
public class CategoryController {
    private final CategoryProductRepository categoryProductRepository;

    @Autowired
    public CategoryController(CategoryProductRepository categoryProductRepository) {
        this.categoryProductRepository = categoryProductRepository;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryProduct> categories = categoryProductRepository.findAll();
        List<CategoryDTO> dtos = categories.stream()
            .map(this::mapToCategoryDTO)
            .toList();

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/withProducts")
    public ResponseEntity<List<CategoryWithProductsDTO>> getCategories() {
        List<CategoryProduct> categories = categoryProductRepository.findAllWithProducts();
        List<CategoryWithProductsDTO> dtos = categories.stream()
            .map(this::mapToCategoryWithProductsDTO)
            .collect(Collectors.toList());

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/withProductImage/{count}")
    public ResponseEntity<List<CategoryWithImageDTO>> getRandomProductForCategories(@PathVariable int count) {

        List<CategoryProduct> categories = categoryProductRepository.findRandomCategories(count);
        List<CategoryWithImageDTO>dtos = new ArrayList<>();

        for (CategoryProduct categoryProduct : categories) {
            CategoryWithImageDTO dto = new CategoryWithImageDTO();
            dto.setId(categoryProduct.getId());
            dto.setName(categoryProduct.getName());

            if(!categoryProduct.getProducts().isEmpty()){
                Product randomProduct = getRandomProduct(categoryProduct.getProducts());
                dto.setImage(randomProduct.getImage());
            }

            dtos.add(dto);
        }

        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    private CategoryDTO mapToCategoryDTO(CategoryProduct categoryProduct) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(categoryProduct.getId());
        dto.setName(categoryProduct.getName());
        return dto;
    }

    private CategoryWithProductsDTO mapToCategoryWithProductsDTO(CategoryProduct categoryProduct) {
        CategoryWithProductsDTO dto = new CategoryWithProductsDTO();
        dto.setId(categoryProduct.getId());
        dto.setName(categoryProduct.getName());
        dto.setProducts(categoryProduct.getProducts());
        return dto;
    }


    private Product getRandomProduct(List<Product> products) {
        int randomIndex = new Random().nextInt(products.size());
        return products.get(randomIndex);
    }


}
