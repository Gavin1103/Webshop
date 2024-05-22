package caaruujuuwoo65.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Random;

@Entity
@Table(name = "product_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    private String categoryName;
    private String description;

    @OneToMany(mappedBy = "category")
    private List<Product> products;

    public String getRandomProductImage() {
        if (products == null || products.isEmpty()) {
            return null;
        }
        Random random = new Random();
        Product randomProduct = products.get(random.nextInt(products.size()));
        List<String> images = randomProduct.getImage();
        if (images == null || images.isEmpty()) {
            return null;
        }
        return images.get(random.nextInt(images.size()));
    }
}