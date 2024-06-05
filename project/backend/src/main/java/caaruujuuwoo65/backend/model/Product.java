package caaruujuuwoo65.backend.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;


@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    private String productName;
    private String description;
    private Integer stock;
    private BigDecimal currentPrice;
    private BigDecimal originalPrice;

    @ElementCollection
    private List<String> image;

    @ManyToOne
    @JoinColumn(name = "category_product")
    @JsonIgnore
    private ProductCategory category;

    @OneToMany(mappedBy = "product")
    private List<Review> reviews;

    // Method to calculate average rating
    @JsonIgnore
    public double getAverageRating() {
        if (reviews == null || reviews.isEmpty()) {
            return 0;
        }
        double totalRating = reviews.stream()
            .mapToInt(Review::getRating)
            .sum();
        return totalRating / reviews.size();
    }

    // Method to get the first image
    @JsonIgnore
    public String getFirstImage() {
        return (image != null && !image.isEmpty()) ? image.get(0) : null;
    }


    // Method to check if the product is on sale
    @JsonIgnore
    public boolean isOnSale() {
        return originalPrice != null && currentPrice != null && currentPrice.compareTo(originalPrice) < 0;
    }
}