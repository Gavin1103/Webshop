package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.OrderStatusDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "order_status")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order")
    private Order order;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "status")
    private Status status;
}