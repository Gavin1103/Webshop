package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.order.CreateCustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.CustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.UpdateCustomerOrderDTO;
import caaruujuuwoo65.backend.helpers.AuthHelper;
import caaruujuuwoo65.backend.model.CustomerOrder;
import caaruujuuwoo65.backend.model.CustomerOrderDetail;
import caaruujuuwoo65.backend.model.User;
import caaruujuuwoo65.backend.repository.CustomerOrderRepository;
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
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;
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
    public CustomerOrderService(CustomerOrderRepository customerOrderRepository, ModelMapper modelMapper, AuthHelper authHelper) {
        this.customerOrderRepository = customerOrderRepository;
        this.modelMapper = modelMapper;
        this.authHelper = authHelper;
    }

    /**
     * Creates a new order for the current user.
     *
     * @param createCustomerOrderDTO the order DTO containing order details
     * @return the created order DTO
     */
    public ResponseEntity<CustomerOrderDTO> createOrder(CreateCustomerOrderDTO createCustomerOrderDTO) {
        User currentUser = authHelper.getCurrentUser();

        CustomerOrder customerOrder = new CustomerOrder();
        customerOrder.setUser(currentUser);
        customerOrder.setOrderDate(LocalDate.now());
        customerOrder.setStatus("Pending");

        List<CustomerOrderDetail> customerOrderDetails = createCustomerOrderDTO.getOrderDetails().stream()
            .map(dto -> {
                CustomerOrderDetail customerOrderDetail = modelMapper.map(dto, CustomerOrderDetail.class);
                customerOrderDetail.setCustomerOrder(customerOrder);
                customerOrderDetail.setTotalPrice(dto.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
                return customerOrderDetail;
            }).collect(Collectors.toList());
        customerOrder.setCustomerOrderDetails(customerOrderDetails.stream().collect(Collectors.toSet()));

        BigDecimal totalAmount = customerOrderDetails.stream()
            .map(CustomerOrderDetail::getTotalPrice)
            .reduce(BigDecimal.ZERO, BigDecimal::add);
        customerOrder.setTotalAmount(totalAmount);

        CustomerOrder savedCustomerOrder = customerOrderRepository.save(customerOrder);
        return new ResponseEntity<>(modelMapper.map(savedCustomerOrder, CustomerOrderDTO.class), HttpStatus.CREATED);
    }

    /**
     * Retrieves all orders for the current user.
     *
     * @return a list of orders
     */
    public List<CustomerOrderDTO> getAllOrdersForCurrentUser() {
        User currentUser = authHelper.getCurrentUser();
        return customerOrderRepository.findByUser(currentUser).stream()
            .map(customerOrder -> modelMapper.map(customerOrder, CustomerOrderDTO.class))
            .collect(Collectors.toList());
    }

    /**
     * Updates an existing userOrder for the current user.
     *
     * @param orderId                the userOrder ID
     * @param updateCustomerOrderDTO the userOrder DTO containing updated details
     * @return the updated userOrder DTO
     */
    public ResponseEntity<CustomerOrderDTO> updateOrder(Long orderId, UpdateCustomerOrderDTO updateCustomerOrderDTO) {
        User currentUser = authHelper.getCurrentUser();

        return customerOrderRepository.findByOrderIdAndUser(orderId, currentUser)
            .map(customerOrder -> {
                customerOrder.setStatus(updateCustomerOrderDTO.getStatus());
                customerOrderRepository.save(customerOrder);
                return new ResponseEntity<>(modelMapper.map(customerOrder, CustomerOrderDTO.class), HttpStatus.OK);
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

        return customerOrderRepository.findByOrderIdAndUser(orderId, currentUser)
            .map(customerOrder -> {
                customerOrderRepository.delete(customerOrder);
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
