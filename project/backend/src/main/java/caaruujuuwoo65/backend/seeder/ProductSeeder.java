package caaruujuuwoo65.backend.seeder;

import caaruujuuwoo65.backend.dto.product.CreateProductDTO;
import caaruujuuwoo65.backend.dto.product.category.CreateProductCategoryDTO;
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
            ProductService productService) {
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
                new CreateProductCategoryDTO("Books", "Literary works"));

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
                        "In a realm of magic and mystery, an unnamed protagonist sets out on a quest to find the lost damsel, aided by strange artifacts and unexpected allies. Through forests, caves, and cliffs, he uncovers fragments of his forgotten memories. As the protagonist delves deeper into this mystical world, he faces formidable foes, solves intricate puzzles, and forges bonds with unlikely companions. Each step brings him closer to the truth, revealing a past filled with secrets and a destiny intertwined with the fate of the realm.",
                        100,
                        699.99,
                        799.99,
                        List.of("https://lucastars.hbo-ict.cloud/media/75ab80bc368c4fc09aee74dca61d3679/00000006000000000000000000000000.png"),
                        categories.get("Electronics").getCategoryId()),
                new CreateProductDTO(
                        "The dragon-Slayer 3000",
                        "In this game, you set out with one of three characters and your party to defeat the dragon. Choose your hero from a diverse group of brave warriors, magical wizards, or cunning archers. Each character has unique skills and weapons that you can upgrade during the adventure. Explore dangerous dungeons, collect powerful items, and unravel ancient secrets. Work together with your teammates to engage in tactical battles and defeat the fearsome dragon to save your kingdom.",
                        100,
                        19.99,
                        29.99,
                        List.of("https://lucastars.hbo-ict.cloud/media/aeb7eb3c542347b6830659a4e0d9885d/00000006000000000000000000000000.png"),
                        categories.get("Fashion").getCategoryId()),
                new CreateProductDTO(
                        "Save The Future",
                        "Are you able to save the future of mankind? If you like science, logical thinking and wine you should give it a go... Step into a world where the fate of humanity rests in your hands. As a brilliant scientist, you must navigate through complex puzzles, decipher cryptic messages, and make groundbreaking discoveries. The storyline intertwines with intriguing characters and unexpected twists. Your decisions will determine the course of history, challenging your intellect and strategic thinking to prevent an impending disaster.",
                        100,
                        24.99,
                        29.99,
                        List.of("https://lucastars.hbo-ict.cloud/media/2626cba298e74c869dfabb1fe9f778b3/00000006000000000000000000000000.png"),
                        categories.get("Sports").getCategoryId()),
                new CreateProductDTO(
                        "Bomb squad: classroom crisis",
                        "Je bent met je vriendin in een hotel. Wanneer je even naar de lobby gaat om snacks te halen en terugkeert naar je kamer, ontdek je dat je vriendin weg is... Terwijl je wanhopig zoekt, ontrafel je aanwijzingen die naar een sinister complot leiden. Ontmoet mysterieuze vreemden, los uitdagende puzzels op en ontdek verborgen geheimen van het hotel. Elk spoor brengt je dichter bij de waarheid, maar de tijd dringt. Kan je haar vinden en de duistere krachten achter haar verdwijning verslaan voordat het te laat is?",
                        100,
                        14.99,
                        19.99,
                        List.of("https://lucastars.hbo-ict.cloud/media/84c86ce53485454382fb2287e387fa9e/00000006000000000000000000000000.png"),
                        categories.get("Books").getCategoryId())

        );

        // Create products
        for (CreateProductDTO productDTO : productDTOs) {
            this.productService.createProduct(productDTO);
        }
    }
}
