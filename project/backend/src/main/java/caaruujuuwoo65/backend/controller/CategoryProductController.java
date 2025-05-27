package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.product.category.CategoryPreviewDTO;
import caaruujuuwoo65.backend.dto.product.category.CategoryWithImageDTO;
import caaruujuuwoo65.backend.dto.product.category.CategoryWithProductsDTO;
import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import caaruujuuwoo65.backend.service.ProductCategoryService;
import caaruujuuwoo65.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
public class CategoryProductController {
    private final ProductCategoryService productCategoryService;
    private final ProductService productService;

    @Autowired
    public CategoryProductController(ProductCategoryService productCategoryService, ProductService productService) {
        this.productCategoryService = productCategoryService;
        this.productService = productService;
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

    @GetMapping("/byProductName")
    @Operation(summary = "Get categories by product name", description = "Get categories associated with a product by its name")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Categories successfully retrieved"),
        @ApiResponse(responseCode = "400", description = "Invalid product name"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<CategoryPreviewDTO>> getCategoriesByProductName(@RequestParam String name) {
        List<CategoryPreviewDTO> categoryPreviewDTOS = productService.getCategoriesByProductName(name);
        return new ResponseEntity<>(categoryPreviewDTOS, HttpStatus.OK);

    }

    @GetMapping("/discounted-products")
    public ResponseEntity<List<CategoryPreviewDTO>> getDiscountedProducts() {
        List<CategoryPreviewDTO> categoryPreviewDTO = productService.getCategoriesWithDiscountedProducts();
        return new ResponseEntity<>(categoryPreviewDTO, HttpStatus.OK);
    }
}