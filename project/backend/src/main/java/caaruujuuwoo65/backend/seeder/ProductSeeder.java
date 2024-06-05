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
                "Smartphone",
                "Introducing our latest Smartphone, a state-of-the-art device designed to meet all your modern needs. With an array of advanced features, this smartphone combines sleek design with exceptional functionality. Enjoy a crystal-clear display, high-resolution camera, and fast processing power, making multitasking a breeze. Priced at $699.99, it offers great value with a retail price of $799.99. Capture your moments with stunning clarity and stay connected with its long-lasting battery. Perfect for tech enthusiasts and everyday users alike, this smartphone is a must-have in the Electronics category. Check out the image and grab yours today!",
                100,
                699.99,
                799.99,
                List.of("https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=828,,fit=contain/image/d200001272315/apple-iphone-15-128gb-groen.jpg"),
                categories.get("Electronics").getCategoryId()
            ),
            new CreateProductDTO(
                "T-shirt",
                "Discover the perfect blend of style and comfort with our latest T-shirt. Made from high-quality materials, this t-shirt ensures a soft and comfortable fit, making it ideal for daily wear. Its stylish design caters to modern fashion trends, ensuring you look great on any occasion. With a price of $19.99, it offers exceptional value compared to the retail price of $29.99. Available in various sizes, it is a must-have addition to your wardrobe. Suitable for all seasons, this t-shirt is part of our Fashion category. Check out the image and elevate your style today!",
                100,
                19.99,
                29.99,
                List.of("https://cdn.engelbert-strauss.nl/assets/pdp/images/Original/product/6.Release.3100031/e_s_T-Shirt_cotton-8075-3-637868074595225719.png"),
                categories.get("Fashion").getCategoryId()
            ),
            new CreateProductDTO(
                "Soccer Ball",
                "Introducing our premium Soccer Ball, designed for professional matches and serious players. Crafted with high-quality materials, this soccer ball ensures optimal performance, durability, and precision in every game. Priced at $24.99, it offers great value compared to the retail price of $29.99. Perfect for both training sessions and competitive matches, it provides excellent control and stability on the field. Whether you're a seasoned player or an aspiring athlete, this soccer ball will enhance your game. Part of our Sports category, it's a must-have for soccer enthusiasts. Check out the image and get ready to score!",
                100,
                24.99,
                29.99,
                List.of("https://m.media-amazon.com/images/I/61IkrxQ9p8L._AC_UF1000,1000_QL80_.jpg"),
                categories.get("Sports").getCategoryId()
            ),
            new CreateProductDTO(
                "Novel",
                "Dive into a world of captivating storytelling with our bestselling Novel. This book promises an engaging reading experience that will keep you hooked from start to finish. Priced at $14.99, it offers excellent value compared to the retail price of $19.99. Perfect for book lovers and casual readers alike, this novel is a great addition to any collection. Whether you're looking for an escape or a thoughtful gift, this book delivers on all fronts. Part of our Books category, it guarantees hours of immersive reading. Check out the image and get your copy today!",
                100,
                14.99,
                19.99,
                List.of("https://m.media-amazon.com/images/I/51xcnrUbLZL._AC_UF894,1000_QL80_DpWeblab_.jpg"),
                categories.get("Books").getCategoryId()
            )
        );

        // Create products
        for (CreateProductDTO productDTO : productDTOs) {
            this.productService.createProduct(productDTO);
        }
    }
}
