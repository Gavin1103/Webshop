package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.cartItem.CartItemDTO;
import caaruujuuwoo65.backend.dto.cartItem.CreateCartItemDTO;
import caaruujuuwoo65.backend.dto.cartItem.UpdateCartItemDTO;
import caaruujuuwoo65.backend.service.CartItemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cart-items")
public class CartItemController {

    private final CartItemService cartItemService;

    @Autowired
    public CartItemController(CartItemService cartItemService) {
        this.cartItemService = cartItemService;
    }

    @PostMapping("/{cartId}")
    @Operation(summary = "Add a new item to the cart", description = "Add a new item to the cart in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Cart item created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid cart item details"),
        @ApiResponse(responseCode = "404", description = "Cart or product not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<CartItemDTO> addCartItem(@PathVariable Long cartId, @Valid @RequestBody CreateCartItemDTO createCartItemDTO) {
        return cartItemService.addCartItem(cartId, createCartItemDTO);
    }

    @PutMapping("/{cartItemId}")
    @Operation(summary = "Update the quantity of an item in the cart", description = "Update the quantity of an item in the cart in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Cart item updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid cart item details"),
        @ApiResponse(responseCode = "404", description = "Cart item not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable Long cartItemId, @Valid @RequestBody UpdateCartItemDTO updateCartItemDTO) {
        return cartItemService.updateCartItem(cartItemId, updateCartItemDTO);
    }

    @DeleteMapping("/{cartItemId}")
    @Operation(summary = "Remove an item from the cart", description = "Remove an item from the cart in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Cart item deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Cart item not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        return cartItemService.removeCartItem(cartItemId);
    }
}
