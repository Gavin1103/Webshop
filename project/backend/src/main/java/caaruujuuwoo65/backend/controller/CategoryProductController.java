package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CategoryDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.service.CategoryProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping ("/categories")
public class CategoryProductController {
    private final CategoryProductService categoryProductService;

    @Autowired
    public CategoryProductController(CategoryProductService categoryProductService) {
        this.categoryProductService = categoryProductService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categoryDTOS = categoryProductService.getAllCategories();
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProducts")
    public ResponseEntity<List<CategoryWithProductsDTO>> getAllCategoriesWithProducts() {
        List<CategoryWithProductsDTO> categoryDTOS = categoryProductService.getCategoriesWithProducts();
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProductImage")
    public ResponseEntity<List<CategoryWithImageDTO>> getAllCategoriesWithProductImage() {
        List<CategoryWithImageDTO> categoryWithImageDTOS = categoryProductService.getCategoryWithImages();
        return new ResponseEntity<>(categoryWithImageDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProductImage/{count}")
    public ResponseEntity<List<CategoryWithImageDTO>> getRandomCategoryWithProductImage(@PathVariable int count) {
        List<CategoryWithImageDTO> categoryWithImageDTOS = categoryProductService.getRandomCategoriesWithImages(count);
        return new ResponseEntity<>(categoryWithImageDTOS, HttpStatus.OK);
    }





}
