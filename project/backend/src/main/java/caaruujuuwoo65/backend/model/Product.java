package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.ProductDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private Long id;

    private String name;

    private int price;

    @Column(length = 1000)
    private String description;

    private int stock;

    private String image;

    @ManyToOne
    @JoinColumn(name = "type_product")
    private TypeProduct type;

    @ManyToOne
    @JoinColumn(name = "category_product")
    @JsonIgnore
    private CategoryProduct category;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Review> reviews;
}