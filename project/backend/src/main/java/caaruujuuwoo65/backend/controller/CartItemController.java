package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CartItemDTO;
import caaruujuuwoo65.backend.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/cart-items")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PostMapping("/add")
    public ResponseEntity<CartItemDTO> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        CartItemDTO savedCartItemDTO = cartItemService.saveCartItem(cartItemDTO);
        return new ResponseEntity<>(savedCartItemDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        cartItemService.removeCartItem(cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<List<CartItemDTO>> getCartItemsByCartId(@PathVariable Long cartId) {
        List<CartItemDTO> cartItemDTOs = cartItemService.findCartItemsByCartId(cartId);
        return new ResponseEntity<>(cartItemDTOs, HttpStatus.OK);
    }

    @GetMapping("/{cartId}/{productId}")
    public ResponseEntity<CartItemDTO> getCartItemByCartIdAndProductId(@PathVariable Long cartId, @PathVariable Long productId) {
        CartItemDTO cartItemDTO = cartItemService.findCartItemByCartIdAndProductId(cartId, productId);
        return new ResponseEntity<>(cartItemDTO, HttpStatus.OK);
    }
}
