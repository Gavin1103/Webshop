package caaruujuuwoo65.backend.seeder;

import caaruujuuwoo65.backend.dto.product.CreateProductDTO;
import caaruujuuwoo65.backend.dto.product.ProductDTO;
import caaruujuuwoo65.backend.dto.product.category.CreateProductCategoryDTO;
import caaruujuuwoo65.backend.dto.product.category.ProductCategoryDTO;
import caaruujuuwoo65.backend.model.ProductCategory;
import caaruujuuwoo65.backend.service.ProductCategoryService;
import caaruujuuwoo65.backend.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.HashMap;
import java.util.Map;

@Component
@Order(2)
public class ProductSeeder implements CommandLineRunner {
    private final ProductCategoryService productCategoryService;
    private final ProductService productService;

    public ProductSeeder(
        ProductCategoryService productCategoryService,
        ProductService productService
    ) {
        this.productCategoryService = productCategoryService;
        this.productService = productService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Check if product data already exists
        if (productService.getAllProducts().isEmpty()) {
            // If product data doesn't exist, create seed data for products
            createProducts();
        }
    }

    private void createProducts() {
        // Create category data
        List<CreateProductCategoryDTO> categoryDTOs = List.of(
            new CreateProductCategoryDTO("Electronics", "Electronic devices"),
            new CreateProductCategoryDTO("Fashion", "Fashion items"),
            new CreateProductCategoryDTO("Sports", "Sporting goods"),
            new CreateProductCategoryDTO("Books", "Literary works")
        );

        Map<String, ProductCategory> categories = new HashMap<>();

        // Create categories and store them in the map
        for (CreateProductCategoryDTO categoryDTO : categoryDTOs) {
            ProductCategory category = this.productCategoryService.createCategory(categoryDTO);
            categories.put(categoryDTO.getName(), category);
        }

        // Create product data
        List<CreateProductDTO> productDTOs = List.of(
            new CreateProductDTO(
                "Lost Memories: Quest of the Forgotten Knight",
                "In a realm of magic and mystery, an unnamed protagonist sets out on a quest to find the lost damsel, aided by strange artifacts and unexpected allies. Through forests, caves, and cliffs, he uncovers fragments of his forgotten memories.",
                100,
                699.99,
                799.99,
                List.of("https://lucastars.hbo-ict.cloud/media/75ab80bc368c4fc09aee74dca61d3679/00000006000000000000000000000000.png"),
                categories.get("Electronics").getCategoryId()
            ),
            new CreateProductDTO(
                "The dragon-Slayer 3000",
                "Bij deze game ga je met een van de drie characters op pad met je party om de draak te verslaan.",
                100,
                19.99,
                29.99,
                List.of("https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png"),
                categories.get("Fashion").getCategoryId()
            ),
            new CreateProductDTO(
                "Save The Future",
                "Are you able to save the future of mankind? If you like science, logical thinking and wine you should give it a go...",
                100,
                24.99,
                29.99,
                List.of("https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png"),
                categories.get("Sports").getCategoryId()
            ),
            new CreateProductDTO(
                "Lost Girl",
                "Je bent met je vriendin in een hotel. Wanneer je even naar de lobby gaat om snacks te halen en terugkeert naar je kamer, ontdek je dat je vriendin weg is...",
                100,
                14.99,
                19.99,
                List.of("https://lucastars.hbo-ict.cloud/media/b6890840ab554224ac6cfcaaa7e9d90d/00000006000000000000000000000000.png"),
                categories.get("Books").getCategoryId()
            )
        );

        // Create products
        for (CreateProductDTO productDTO : productDTOs) {
            this.productService.createProduct(productDTO);
        }
    }
}
