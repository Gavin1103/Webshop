package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.CartDTO;
import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.CartRepository;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final CartItemService cartItemService;

    /**
     * Constructs a new CartService.
     *
     * @param cartRepository    the repository for cart data
     * @param productRepository the repository for product data
     */
    @Autowired
    public CartService(CartRepository cartRepository, ProductRepository productRepository, CartItemService cartItemService) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.cartItemService = cartItemService;
    }

    /**
     * Retrieves the cart for a specific user.
     *
     * @param userId the ID of the user
     * @return the cart DTO if found, otherwise null
     */
    public CartDTO getCartByUserId(Long userId) {
        Cart cart = cartRepository.findByUserUserId(userId);
        return cart != null ? convertToDTO(cart) : null;
    }

    /**
     * Adds a product to a user's cart.
     *
     * @param userId    the ID of the user
     * @param productId the ID of the product
     * @param quantity  the quantity of the product to add
     * @return the updated cart DTO
     */
    public CartDTO addProductToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserUserId(userId);
        if (cart == null) {
            cart = new Cart();
            User user = new User();
            user.setUserId(userId);
            cart.setUser(user);
        }

        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = cart.getCartItems().stream()
            .filter(item -> item.getProduct().getProductId().equals(productId))
            .findFirst()
            .orElse(null);

        if (cartItem == null) {
            cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());
            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(quantity)));
            cartItem.setCart(cart);
            cart.getCartItems().add(cartItem);
        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        cart = cartRepository.save(cart);
        return convertToDTO(cart);
    }

    /**
     * Removes a product from a user's cart.
     *
     * @param userId    the ID of the user
     * @param productId the ID of the product to remove
     */
    public void removeProductFromCart(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserUserId(userId);
        if (cart == null) return;

        cart.getCartItems().removeIf(item -> item.getProduct().getProductId().equals(productId));
        cartRepository.save(cart);
    }

    /**
     * Converts a Cart entity to a CartDTO.
     *
     * @param cart the cart entity
     * @return the cart DTO
     */
    private CartDTO convertToDTO(Cart cart) {
        CartDTO cartDTO = new CartDTO();
        cartDTO.setCartId(cart.getCartId());
        cartDTO.setUserId(cart.getUser().getUserId());
        cartDTO.setCartItems(cart.getCartItems().stream().map(cartItemService::convertToCartItemDTO).collect(Collectors.toList()));
        return cartDTO;
    }

    /**
     * Converts a CartDTO to a Cart entity.
     *
     * @param cartDTO the cart DTO
     * @return the cart entity
     */
    private Cart convertToEntity(CartDTO cartDTO) {
        Cart cart = new Cart();
        cart.setCartId(cartDTO.getCartId());
        User user = new User();
        user.setUserId(cartDTO.getUserId());
        cart.setUser(user);
        cart.setCartItems(cartDTO.getCartItems().stream().map(cartItemService::convertToCartItemEntity).collect(Collectors.toSet()));
        return cart;
    }
}