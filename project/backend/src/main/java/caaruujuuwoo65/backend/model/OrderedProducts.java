package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.OrderedProductsDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ordered_products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderedProducts {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_record")
    private OrderRecord orderRecord;

    @ManyToOne
    @JoinColumn(name = "product")
    private Product product;

    private int amount;
}