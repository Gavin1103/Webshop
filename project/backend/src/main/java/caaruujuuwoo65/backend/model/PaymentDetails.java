package caaruujuuwoo65.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "payment_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentDetailsId;

    @ManyToOne
    @JoinColumn(name = "order_id", referencedColumnName = "orderId")
    private CustomerOrder customerOrder;

    @ManyToOne
    @JoinColumn(name = "payment_method_id", referencedColumnName = "paymentMethodId")
    private PaymentMethod paymentMethod;

    private String cardHolderName;
    private String cardNumber;
    private LocalDate expiryDate;
}