package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.config.PreAuthorizeAdmin;
import caaruujuuwoo65.backend.dto.product.ProductAverageRatingDTO;
import caaruujuuwoo65.backend.dto.product.ProductPreviewDTO;
import caaruujuuwoo65.backend.dto.product.ProductReviewsDTO;
import caaruujuuwoo65.backend.dto.product.ProductDTO;
import caaruujuuwoo65.backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @Operation(summary = "Get all products", description = "Get all products from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        List<ProductDTO> dtos = productService.getAllProducts();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/topDeals")
    @Operation(summary = "Get top deals", description = "Get top deals from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<ProductPreviewDTO>> getTopDeals() {
        List<ProductPreviewDTO> dtos = productService.getTopDeals();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    @Operation(summary = "Get recommended products", description = "Get recommended products from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved list"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<ProductPreviewDTO>> getRecommendProducts() {
        List<ProductPreviewDTO> dtos = productService.getRecommendProducts();
        return new ResponseEntity<>(dtos, HttpStatus.OK);
    }

    @GetMapping("/filter")
    @Operation(summary = "Filter products", description = "Filter products based on various criteria")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved filtered products"),
        @ApiResponse(responseCode = "400", description = "Invalid filter criteria"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public List<ProductAverageRatingDTO> getFilteredProducts(
        @RequestParam(required = false) String categories,
        @RequestParam(required = false) Integer minPrice,
        @RequestParam(required = false) Integer maxPrice,
        @RequestParam(required = false) Integer minRating,
        @RequestParam(required = false) String name,
        @RequestParam(required = false) boolean isDiscounted
    ) {

        List<String> categoryList = categories != null ? Arrays.asList(categories.split(",")) : null;

        return productService.getFilteredProducts(categoryList, minPrice, maxPrice, minRating, name, isDiscounted);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get product by id", description = "Get product by id")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product successfully retrieved"),
        @ApiResponse(responseCode = "404", description = "Product not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> getProductById(@PathVariable int id) {
        ProductDTO product = productService.getProductById(id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        return ResponseEntity.ok(product);
    }

    @GetMapping("/search")
    @Operation(summary = "Search products", description = "Search products by keyword")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Products successfully retrieved"),
        @ApiResponse(responseCode = "400", description = "Invalid search keyword"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<ProductDTO>> searchProducts(@RequestParam("keyword") String keyword) {
        List<ProductDTO> products = productService.searchProducts(keyword);
        return ResponseEntity.ok(products);
    }


    @PreAuthorizeAdmin
    @PutMapping("/{productId}")
    @Operation(summary = "Update product", description = "Update an existing product by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Product updated successfully"),
        @ApiResponse(responseCode = "400", description = "Product not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<ProductDTO> updateProduct(
        @Parameter(description = "ID of the product to be updated", required = true) @PathVariable Long productId,
        @Parameter(description = "Updated product information", required = true) @RequestBody ProductDTO updateProductDTO) {
        ProductDTO updatedProduct = productService.updateProduct(productId, updateProductDTO);
        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorizeAdmin
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        boolean isDeleted = productService.deleteProduct(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PreAuthorizeAdmin
    @PostMapping("/add")
    public ResponseEntity<ProductDTO> addProduct(@RequestBody ProductDTO productDTO) {
        ProductDTO createdProduct = productService.addProduct(productDTO);
        if (createdProduct != null) {
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/reviews/{id}")
    @Operation(summary = "Get all reviews by product id", description = "Get all reviews by product id")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Reviews successfully retrieved"),
            @ApiResponse(responseCode = "404", description = "Reviews not found"),
            @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<?> getProductReviews(@PathVariable int id) {
        ProductReviewsDTO product = productService.getProductWithReviewsById((long) id);
        if (product == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
        }
        return ResponseEntity.ok(product);
    }
}