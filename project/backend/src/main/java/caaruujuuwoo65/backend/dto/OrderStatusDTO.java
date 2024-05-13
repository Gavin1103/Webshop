package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.OrderRecord;
import caaruujuuwoo65.backend.model.Status;
import java.time.LocalDateTime;


@Getter
@Setter
public class OrderStatusDTO {
    private OrderRecord orderRecord;
    private LocalDateTime date;
    private Status status;
}