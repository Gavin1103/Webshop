package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderStatusDTO {
    private Order order;
    private Datetime date;
    private Status status;
}