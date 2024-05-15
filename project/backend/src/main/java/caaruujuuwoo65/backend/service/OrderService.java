package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.order.CreateOrderDTO;
import caaruujuuwoo65.backend.dto.order.OrderDTO;
import caaruujuuwoo65.backend.dto.order.UpdateOrderDTO;
import caaruujuuwoo65.backend.helpers.AuthHelper;
import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.OrderDetail;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.OrderRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for managing orders.
 */
@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;
    private final AuthHelper authHelper;

    /**
     * Constructs a new OrderService.
     *
     * @param orderRepository         the repository for order data
     * @param paymentMethodRepository the repository for payment method data
     * @param paymentDetailsService   the service for payment details
     */
    @Autowired
    public OrderService(OrderRepository orderRepository, ModelMapper modelMapper, AuthHelper authHelper) {
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
        this.authHelper = authHelper;
    }

    /**
     * Creates a new order for the current user.
     *
     * @param createOrderDTO the order DTO containing order details
     * @return the created order DTO
     */
    public ResponseEntity<OrderDTO> createOrder(CreateOrderDTO createOrderDTO) {
        User currentUser = authHelper.getCurrentUser();

        Order order = new Order();
        order.setUser(currentUser);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Pending");

        List<OrderDetail> orderDetails = createOrderDTO.getOrderDetails().stream()
            .map(dto -> {
                OrderDetail orderDetail = modelMapper.map(dto, OrderDetail.class);
                orderDetail.setOrder(order);
                orderDetail.setTotalPrice(dto.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
                return orderDetail;
            }).collect(Collectors.toList());
        order.setOrderDetails(orderDetails.stream().collect(Collectors.toSet()));

        BigDecimal totalAmount = orderDetails.stream()
            .map(OrderDetail::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);
        return new ResponseEntity<>(modelMapper.map(savedOrder, OrderDTO.class), HttpStatus.CREATED);
    }

    /**
     * Retrieves all orders for the current user.
     *
     * @return a list of orders
     */
    public List<OrderDTO> getAllOrdersForCurrentUser() {
        User currentUser = authHelper.getCurrentUser();
        return orderRepository.findByUser(currentUser).stream()
            .map(order -> modelMapper.map(order, OrderDTO.class))
            .collect(Collectors.toList());
    }

    /**
     * Updates an existing order for the current user.
     *
     * @param orderId        the order ID
     * @param updateOrderDTO the order DTO containing updated details
     * @return the updated order DTO
     */
    public ResponseEntity<OrderDTO> updateOrder(Long orderId, UpdateOrderDTO updateOrderDTO) {
        User currentUser = authHelper.getCurrentUser();

        return orderRepository.findByIdAndUser(orderId, currentUser)
            .map(order -> {
                order.setStatus(updateOrderDTO.getStatus());
                orderRepository.save(order);
                return new ResponseEntity<>(modelMapper.map(order, OrderDTO.class), HttpStatus.OK);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Deletes an order for the current user.
     *
     * @param orderId the order ID
     * @return response entity
     */
    public ResponseEntity<Void> deleteOrder(Long orderId) {
        User currentUser = authHelper.getCurrentUser();

        return orderRepository.findByIdAndUser(orderId, currentUser)
            .map(order -> {
                orderRepository.delete(order);
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
