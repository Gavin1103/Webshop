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
@Table(name = "customer_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId")
    private User user;

    private LocalDate orderDate;
    private String status;
    private BigDecimal totalAmount;

    @OneToMany(mappedBy = "customerOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CustomerOrderDetail> customerOrderDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_details_id", referencedColumnName = "paymentDetailsId")
    private PaymentDetails paymentDetails;
}