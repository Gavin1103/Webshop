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
        // Create categories
        CreateProductCategoryDTO electronicsCategoryDTO = new CreateProductCategoryDTO("Electronics", "Electronic devices");
        CreateProductCategoryDTO fashionCategoryDTO = new CreateProductCategoryDTO("Fashion", "Fashion items");
        CreateProductCategoryDTO sportsCategoryDTO = new CreateProductCategoryDTO("Sports", "Sporting goods");
        CreateProductCategoryDTO booksCategoryDTO = new CreateProductCategoryDTO("Books", "Literary works");

        ProductCategory electronicsCategory = this.productCategoryService.createCategory(electronicsCategoryDTO);
        ProductCategory fashionCategory = this.productCategoryService.createCategory(fashionCategoryDTO);
        ProductCategory sportsCategory = this.productCategoryService.createCategory(sportsCategoryDTO);
        ProductCategory booksCategory = this.productCategoryService.createCategory(booksCategoryDTO);

        // Create products
        CreateProductDTO product1DTO = new CreateProductDTO(
            "Smartphone",
            "A modern smartphone with many features",
            100,
            699.99,
            799.99,
            List.of("https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d200001272315/apple-iphone-15-128gb-groen.jpg"),
            electronicsCategory.getCategoryId()
        );

        CreateProductDTO product2DTO = new CreateProductDTO(
            "T-shirt",
            "A stylish and comfortable t-shirt",
            100,
            19.99,
            29.99,
            List.of("https://cdn.engelbert-strauss.nl/assets/pdp/images/Original/product/6.Release.3100031/e_s_T-Shirt_cotton-8075-3-637868074595225719.png"),
            fashionCategory.getCategoryId()
        );

        CreateProductDTO product3DTO = new CreateProductDTO(
            "Soccer Ball",
            "High-quality soccer ball for professional matches",
            100,
            24.99,
            29.99,
            List.of("https://m.media-amazon.com/images/I/61IkrxQ9p8L._AC_UF1000,1000_QL80_.jpg"),
            sportsCategory.getCategoryId()
        );

        CreateProductDTO product4DTO = new CreateProductDTO(
            "Novel",
            "Bestselling novel for an engaging reading experience",
            100,
            14.99,
            19.99,
            List.of("https://m.media-amazon.com/images/I/51xcnrUbLZL._AC_UF894,1000_QL80_DpWeblab_.jpg"),
            booksCategory.getCategoryId()
        );

        this.productService.createProduct(product1DTO);
        this.productService.createProduct(product2DTO);
        this.productService.createProduct(product3DTO);
        this.productService.createProduct(product4DTO);
    }
}
