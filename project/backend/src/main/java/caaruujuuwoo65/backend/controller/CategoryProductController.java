package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import caaruujuuwoo65.backend.service.ProductCategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryProductController {
    private final ProductCategoryService productCategoryService;

    @Autowired
    public CategoryProductController(ProductCategoryService productCategoryService) {
        this.productCategoryService = productCategoryService;
    }

    @GetMapping
    @Operation(summary = "Get all categories", description = "Get all categories from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<ProductCategoryDTO>> getAllCategories() {
        List<ProductCategoryDTO> categoryDTOS = productCategoryService.getAllCategories();
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProducts")
    @Operation(summary = "Get all categories with products", description = "Get all categories with associated products from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<CategoryWithProductsDTO>> getAllCategoriesWithProducts() {
        List<CategoryWithProductsDTO> categoryDTOS = productCategoryService.getCategoriesWithProducts();
        return new ResponseEntity<>(categoryDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProductImage")
    @Operation(summary = "Get all categories with product images", description = "Get all categories with associated product images from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<CategoryWithImageDTO>> getAllCategoriesWithProductImage() {
        List<CategoryWithImageDTO> categoryWithImageDTOS = productCategoryService.getCategoryWithImages();
        return new ResponseEntity<>(categoryWithImageDTOS, HttpStatus.OK);
    }

    @GetMapping("/withProductImage/{count}")
    @Operation(summary = "Get random categories with product images", description = "Get random categories with associated product images from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<CategoryWithImageDTO>> getRandomCategoryWithProductImage(@PathVariable int count) {
        List<CategoryWithImageDTO> categoryWithImageDTOS = productCategoryService.getRandomCategoriesWithImages(count);
        return new ResponseEntity<>(categoryWithImageDTOS, HttpStatus.OK);
    }


}
