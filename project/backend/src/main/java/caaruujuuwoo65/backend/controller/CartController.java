package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.CartDTO;
import caaruujuuwoo65.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<CartDTO> getCartByUserId(@PathVariable Long userId) {
        CartDTO cartDTO = cartService.getCartByUserId(userId);
        return new ResponseEntity<>(cartDTO, cartDTO != null ? HttpStatus.OK : HttpStatus.NOT_FOUND);
    }

    @PostMapping("/{userId}/add")
    public ResponseEntity<CartDTO> addProductToCart(@PathVariable Long userId, @RequestParam Long productId, @RequestParam Integer quantity) {
        CartDTO cartDTO = cartService.addProductToCart(userId, productId, quantity);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{userId}/remove")
    public ResponseEntity<Void> removeProductFromCart(@PathVariable Long userId, @RequestParam Long productId) {
        cartService.removeProductFromCart(userId, productId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
