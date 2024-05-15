package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.OrderDTO;
import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.PaymentDetails;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.OrderRepository;
import caaruujuuwoo65.backend.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

/**
 * Service class for managing orders.
 */
@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final PaymentDetailsService paymentDetailsService;

    /**
     * Constructs a new OrderService.
     *
     * @param orderRepository         the repository for order data
     * @param paymentMethodRepository the repository for payment method data
     * @param paymentDetailsService   the service for payment details
     */
    @Autowired
    public OrderService(OrderRepository orderRepository, PaymentMethodRepository paymentMethodRepository, PaymentDetailsService paymentDetailsService) {
        this.orderRepository = orderRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.paymentDetailsService = paymentDetailsService;
    }

    /**
     * Creates a new order for a user.
     *
     * @param userId   the ID of the user
     * @param orderDTO the order DTO containing order details
     * @return the created order DTO
     */
    public OrderDTO createOrder(Long userId, OrderDTO orderDTO) {
        Order order = new Order();
        User user = new User();
        user.setUserId(userId);
        order.setUser(user);
        order.setOrderDate(LocalDate.now());
        order.setStatus("Pending");
        order.setTotalAmount(orderDTO.getTotalAmount());

        PaymentDetails paymentDetails = paymentDetailsService.convertToEntity(orderDTO.getPaymentDetails());
        paymentDetails.setOrder(order);
        order.setPaymentDetails(paymentDetails);

        order = orderRepository.save(order);
        return convertToDTO(order);
    }

    /**
     * Converts an Order entity to an OrderDTO.
     *
     * @param order the order entity
     * @return the order DTO
     */
    private OrderDTO convertToDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderId(order.getOrderId());
        orderDTO.setUserId(order.getUser().getUserId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setStatus(order.getStatus());
        orderDTO.setTotalAmount(order.getTotalAmount());
        orderDTO.setPaymentDetails(paymentDetailsService.convertToDTO(order.getPaymentDetails()));
        return orderDTO;
    }
}
