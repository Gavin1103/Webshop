package caaruujuuwoo65.backend.dto;

import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
public class CartDTO {
    private Long cartId;
    private Long userId;
    private List<CartItemDTO> cartItems;
}