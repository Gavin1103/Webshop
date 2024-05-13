package caaruujuuwoo65.backend.dto;

import lombok.Getter;
import lombok.Setter;
import caaruujuuwoo65.backend.model.User;




@Getter
@Setter
public class OrderDTO {
    private int ordernumber;
    private User user;
}