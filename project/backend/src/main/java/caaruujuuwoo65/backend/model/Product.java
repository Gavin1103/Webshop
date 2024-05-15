package caaruujuuwoo65.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Entity
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
    private BigDecimal price;

    @ElementCollection
    private List<String> image;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
}