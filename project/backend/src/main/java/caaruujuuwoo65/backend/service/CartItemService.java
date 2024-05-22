package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.cartItem.CartItemDTO;
import caaruujuuwoo65.backend.dto.cartItem.CreateCartItemDTO;
import caaruujuuwoo65.backend.dto.cartItem.UpdateCartItemDTO;
import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.repository.CartItemRepository;
import caaruujuuwoo65.backend.repository.CartRepository;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

/**
 * Service class for managing shopping cart items.
 */
@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public CartItemService(CartItemRepository cartItemRepository, CartRepository cartRepository, ProductRepository productRepository, ModelMapper modelMapper) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
    }

    /**
     * Adds a new item to the cart.
     *
     * @param cartId            the cart ID
     * @param createCartItemDTO the cart item DTO
     * @return the created cart item
     */
    public ResponseEntity<CartItemDTO> addCartItem(Long cartId, CreateCartItemDTO createCartItemDTO) {
        Optional<Cart> cartOptional = cartRepository.findById(cartId);
        if (!cartOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<Product> productOptional = productRepository.findById(createCartItemDTO.getProductId());
        if (!productOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Cart cart = cartOptional.get();
        Product product = productOptional.get();

        Optional<CartItem> existingCartItem = cartItemRepository.findByCartAndProduct(cart, product);
        CartItem cartItem;
        if (existingCartItem.isPresent()) {
            cartItem = existingCartItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + createCartItemDTO.getQuantity());
        } else {
            cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(createCartItemDTO.getQuantity());
        }
        cartItem.setUnitPrice(product.getPrice());
        cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));

        cartItem = cartItemRepository.save(cartItem);
        CartItemDTO cartItemDTO = modelMapper.map(cartItem, CartItemDTO.class);

        return new ResponseEntity<>(cartItemDTO, HttpStatus.CREATED);
    }

    /**
     * Updates the quantity of an item in the cart.
     *
     * @param cartItemId        the cart item ID
     * @param updateCartItemDTO the cart item DTO
     * @return the updated cart item
     */
    public ResponseEntity<CartItemDTO> updateCartItem(Long cartItemId, UpdateCartItemDTO updateCartItemDTO) {
        Optional<CartItem> cartItemOptional = cartItemRepository.findById(cartItemId);
        if (!cartItemOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        CartItem cartItem = cartItemOptional.get();
        cartItem.setQuantity(updateCartItemDTO.getQuantity());
        cartItem.setTotalPrice(cartItem.getUnitPrice().multiply(BigDecimal.valueOf(updateCartItemDTO.getQuantity())));

        cartItem = cartItemRepository.save(cartItem);
        CartItemDTO cartItemDTO = modelMapper.map(cartItem, CartItemDTO.class);

        return new ResponseEntity<>(cartItemDTO, HttpStatus.OK);
    }

    /**
     * Removes an item from the cart.
     *
     * @param cartItemId the cart item ID
     * @return response entity
     */
    public ResponseEntity<Void> removeCartItem(Long cartItemId) {
        if (!cartItemRepository.existsById(cartItemId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cartItemRepository.deleteById(cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
