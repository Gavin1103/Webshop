package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.CartItemDTO;
import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemService {

    private final ProductRepository productRepository;

    /**
     * Constructs a new CartItemService.
     *
     * @param productRepository the repository for product data
     */
    @Autowired
    public CartItemService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * Converts a CartItem entity to a CartItemDTO.
     *
     * @param cartItem the cart item entity
     * @return the cart item DTO
     */
    public CartItemDTO convertToCartItemDTO(CartItem cartItem) {
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setCartItemId(cartItem.getCartItemId());
        cartItemDTO.setCartId(cartItem.getCart().getCartId());
        cartItemDTO.setProductId(cartItem.getProduct().getProductId());
        cartItemDTO.setQuantity(cartItem.getQuantity());
        cartItemDTO.setUnitPrice(cartItem.getUnitPrice());
        cartItemDTO.setTotalPrice(cartItem.getTotalPrice());
        return cartItemDTO;
    }

    /**
     * Converts a CartItemDTO to a CartItem entity.
     *
     * @param cartItemDTO the cart item DTO
     * @return the cart item entity
     */
    public CartItem convertToCartItemEntity(CartItemDTO cartItemDTO) {
        CartItem cartItem = new CartItem();
        cartItem.setCartItemId(cartItemDTO.getCartItemId());
        Cart cart = new Cart();
        cart.setCartId(cartItemDTO.getCartId());
        cartItem.setCart(cart);
        Product product = productRepository.findById(cartItemDTO.getProductId()).orElseThrow(() -> new RuntimeException("Product not found"));
        cartItem.setProduct(product);
        cartItem.setQuantity(cartItemDTO.getQuantity());
        cartItem.setUnitPrice(cartItemDTO.getUnitPrice());
        cartItem.setTotalPrice(cartItemDTO.getTotalPrice());
        return cartItem;
    }
}