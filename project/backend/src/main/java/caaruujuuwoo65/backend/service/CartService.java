package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.cart.CartDTO;
import caaruujuuwoo65.backend.dto.cart.UpdateCartDTO;
import caaruujuuwoo65.backend.helpers.AuthHelper;
import caaruujuuwoo65.backend.model.Cart;
import caaruujuuwoo65.backend.model.CartItem;
import caaruujuuwoo65.backend.model.Product;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.CartRepository;
import caaruujuuwoo65.backend.repository.ProductRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing shopping carts.
 */
@Service
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final ModelMapper modelMapper;
    private final AuthHelper authHelper;

    @Autowired
    public CartService(CartRepository cartRepository, ProductRepository productRepository, ModelMapper modelMapper, AuthHelper authHelper) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
        this.modelMapper = modelMapper;
        this.authHelper = authHelper;
    }

    /**
     * Retrieves or creates the cart for the current user.
     *
     * @return the cart DTO
     */
    public ResponseEntity<CartDTO> getOrCreateCartForCurrentUser() {
        User currentUser = authHelper.getCurrentUser();
        Optional<Cart> cartOptional = cartRepository.findByUser(currentUser);

        Cart cart;
        if (cartOptional.isPresent()) {
            cart = cartOptional.get();
        } else {
            cart = new Cart();
            cart.setUser(currentUser);
            cart = cartRepository.save(cart);
        }

        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    /**
     * Updates the cart for the current user.
     *
     * @param updateCartDTO the cart DTO containing updated details
     * @return the updated cart DTO
     */
    public ResponseEntity<CartDTO> updateCart(UpdateCartDTO updateCartDTO) {
        User currentUser = authHelper.getCurrentUser();
        Optional<Cart> cartOptional = cartRepository.findByUser(currentUser);
        if (!cartOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Cart cart = cartOptional.get();
        Set<CartItem> updatedCartItems = updateCartDTO.getItems().stream().map(itemDTO -> {
            Optional<Product> productOptional = productRepository.findById(itemDTO.getProductId());
            if (!productOptional.isPresent()) {
                throw new RuntimeException("Product not found");
            }
            CartItem cartItem = new CartItem();
            cartItem.setProduct(productOptional.get());
            cartItem.setCart(cart);
            cartItem.setQuantity(itemDTO.getQuantity());
            cartItem.setUnitPrice(productOptional.get().getPrice());
            cartItem.setTotalPrice(productOptional.get().getPrice().multiply(BigDecimal.valueOf(itemDTO.getQuantity())));
            return cartItem;
        }).collect(Collectors.toSet());

        cart.setCartItems(updatedCartItems);
        Cart updatedCart = cartRepository.save(cart);
        CartDTO cartDTO = modelMapper.map(updatedCart, CartDTO.class);
        return new ResponseEntity<>(cartDTO, HttpStatus.OK);
    }

    /**
     * Deletes the cart for the current user.
     *
     * @return response entity
     */
    public ResponseEntity<Void> deleteCartForCurrentUser() {
        User currentUser = authHelper.getCurrentUser();
        Optional<Cart> cartOptional = cartRepository.findByUser(currentUser);
        if (!cartOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cartRepository.delete(cartOptional.get());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}