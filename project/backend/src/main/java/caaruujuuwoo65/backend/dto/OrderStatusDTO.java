package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.Status;
import java.time.LocalDateTime;


@Getter
@Setter
public class OrderStatusDTO {
    private Order order;
    private LocalDateTime date;
    private Status status;
}