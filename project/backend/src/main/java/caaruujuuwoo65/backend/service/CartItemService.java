package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.CartItemDTO;
import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.CartItemRepository;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing shopping cart items.
 */
@Service
public class CartItemService {

    private final ProductRepository productRepository;
    private final CartItemRepository cartItemRepository;

    /**
     * Constructs a new CartItemService.
     *
     * @param productRepository  the repository for product data
     * @param cartItemRepository the repository for cart item data
     */
    @Autowired
    public CartItemService(ProductRepository productRepository, CartItemRepository cartItemRepository) {
        this.productRepository = productRepository;
        this.cartItemRepository = cartItemRepository;
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

    /**
     * Saves a cart item.
     *
     * @param cartItemDTO the cart item DTO to save
     * @return the saved cart item DTO
     */
    public CartItemDTO saveCartItem(CartItemDTO cartItemDTO) {
        CartItem cartItem = convertToCartItemEntity(cartItemDTO);
        CartItem savedCartItem = cartItemRepository.save(cartItem);
        return convertToCartItemDTO(savedCartItem);
    }

    /**
     * Removes a cart item by its ID.
     *
     * @param cartItemId the ID of the cart item to remove
     */
    public void removeCartItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    /**
     * Finds cart items by cart ID.
     *
     * @param cartId the ID of the cart
     * @return a list of cart item DTOs
     */
    public List<CartItemDTO> findCartItemsByCartId(Long cartId) {
        return cartItemRepository.findByCartCartId(cartId).stream()
            .map(this::convertToCartItemDTO)
            .collect(Collectors.toList());
    }

    /**
     * Finds a cart item by cart ID and product ID.
     *
     * @param cartId    the ID of the cart
     * @param productId the ID of the product
     * @return the cart item DTO if found, otherwise null
     */
    public CartItemDTO findCartItemByCartIdAndProductId(Long cartId, Long productId) {
        CartItem cartItem = cartItemRepository.findByCartCartIdAndProductProductId(cartId, productId);
        return cartItem != null ? convertToCartItemDTO(cartItem) : null;
    }
}
