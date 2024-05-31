package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.cart.CartDTO;
import caaruujuuwoo65.backend.dto.cart.UpdateCartDTO;
import caaruujuuwoo65.backend.repository.CartItemRepository;
import caaruujuuwoo65.backend.repository.CartRepository;
import caaruujuuwoo65.backend.repository.UserRepository;
import caaruujuuwoo65.backend.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/")
    @Operation(summary = "Get the cart for the current user", description = "Get the cart from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart retrieved successfully"),
        @ApiResponse(responseCode = "404", description = "Cart not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<CartDTO> getOrCreateCartForCurrentUser() {
        return cartService.getOrCreateCartForCurrentUser();
    }

    @PutMapping("/")
    @Operation(summary = "Update the cart for the current user", description = "Update the cart in the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid cart details"),
        @ApiResponse(responseCode = "404", description = "Cart not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<CartDTO> updateCart(@RequestBody UpdateCartDTO updateCartDTO) {
        return cartService.updateCart(updateCartDTO);
    }

    @DeleteMapping("/")
    @Operation(summary = "Delete the cart for the current user", description = "Delete the cart from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Cart deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Cart not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deleteCartForCurrentUser() {
        return cartService.deleteCartForCurrentUser();
    }
}
