package caaruujuuwoo65.backend.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    private LocalDate orderDate;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private OrderStatus status;

    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "order")
    private Set<OrderDetail> orderDetails;

}