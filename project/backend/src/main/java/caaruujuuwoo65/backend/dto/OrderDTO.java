package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;


@Getter
@Setter
public class OrderDTO {
    private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private String status;
    private BigDecimal totalAmount;
}