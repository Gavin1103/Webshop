package caaruujuuwoo65.backend.model;


import caaruujuuwoo65.backend.dto.OrderStatusDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

import caaruujuuwoo65.backend.model.Status;
import caaruujuuwoo65.backend.model.OrderRecord;

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
    @JoinColumn(name = "order_record")
    private OrderRecord orderRecord;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "status")
    private Status status;
}