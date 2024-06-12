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

    private String cardHolderName;
    private String cardNumber;
    private LocalDate expiryDate;
    private String paymentMethod;

    @OneToOne(mappedBy = "paymentDetails")
    @JoinColumn(name = "order_id", referencedColumnName = "orderId")
    private CustomerOrder customerOrder;

}