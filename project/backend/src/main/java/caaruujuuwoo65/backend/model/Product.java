package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.ProductDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import caaruujuuwoo65.backend.model.TypeProduct;
import caaruujuuwoo65.backend.model.CategoryProduct;

import java.sql.Blob;

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
    private CategoryProduct category;
}