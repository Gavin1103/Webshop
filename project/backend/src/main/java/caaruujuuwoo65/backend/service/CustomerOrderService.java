package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.order.CreateCustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.CustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.UpdateCustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.detail.CreateCustomerOrderDetailDTO;
import caaruujuuwoo65.backend.dto.order.detail.UpdateCustomerOrderDetailDTO;
import caaruujuuwoo65.backend.model.*;
import caaruujuuwoo65.backend.repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service class for managing orders.
 */
@Service
@Transactional
public class CustomerOrderService {

    private final CustomerOrderRepository customerOrderRepository;
    private final ProductRepository productRepository;
    private final CustomerOrderDetailRepository customerOrderDetailRepository;
    private final AddressRepository addressRepository;
    private final PersonalDetailsRepository personalDetailsRepository;
    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final PaymentDetailsRepository paymentDetailsRepository;

    /**
     * Constructs a new OrderService.
     */
    @Autowired
    public CustomerOrderService(CustomerOrderRepository customerOrderRepository, ProductRepository productRepository, CustomerOrderDetailRepository customerOrderDetailRepository, AddressRepository addressRepository, PersonalDetailsRepository personalDetailsRepository, ModelMapper modelMapper, UserRepository userRepository, PaymentDetailsRepository paymentDetailsRepository) {
        this.customerOrderRepository = customerOrderRepository;
        this.productRepository = productRepository;
        this.customerOrderDetailRepository = customerOrderDetailRepository;
        this.addressRepository = addressRepository;
        this.personalDetailsRepository = personalDetailsRepository;
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.paymentDetailsRepository = paymentDetailsRepository;
    }

    /**
     * Creates a new order for the current user.
     *
     * @param createCustomerOrderDTO the order DTO containing order details
     * @return the created order DTO
     */
    public ResponseEntity<CustomerOrderDTO> createOrder(CreateCustomerOrderDTO createCustomerOrderDTO) {
        CustomerOrder customerOrder = new CustomerOrder();

        // Set user if userId is present
        if (createCustomerOrderDTO.getUserId() != null) {
            User user = userRepository.findById(createCustomerOrderDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
            customerOrder.setUser(user);
        }

        // Set personal details for guest users
        if (createCustomerOrderDTO.getUserId() == null) {
            PersonalDetails personalDetails = modelMapper.map(createCustomerOrderDTO.getPersonalDetails(), PersonalDetails.class);
            customerOrder.setPersonalDetails(personalDetailsRepository.save(personalDetails));
        }

        customerOrder.setOrderDate(LocalDate.now());
        customerOrder.setStatus("Pending");

        // Save billing and shipping addresses
        Address billingAddress = modelMapper.map(createCustomerOrderDTO.getBillingAddress(), Address.class);
        billingAddress.setType("billing");
        customerOrder.setBillingAddress(addressRepository.save(billingAddress));

        if (createCustomerOrderDTO.getShippingAddress() != null) {
            Address shippingAddress = modelMapper.map(createCustomerOrderDTO.getShippingAddress(), Address.class);
            shippingAddress.setType("shipping");
            customerOrder.setShippingAddress(addressRepository.save(shippingAddress));
        } else {
            customerOrder.setShippingAddress(billingAddress);
        }

        CustomerOrder savedCustomerOrder = customerOrderRepository.save(customerOrder);

        // Initialize the set for order details
        Set<CustomerOrderDetail> customerOrderDetails = new HashSet<>();

        // Set order details
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CreateCustomerOrderDetailDTO dto : createCustomerOrderDTO.getOrderDetails()) {
            CustomerOrderDetail customerOrderDetail = new CustomerOrderDetail();
            productRepository.findById(dto.getProductId())
                .ifPresentOrElse(customerOrderDetail::setProduct, () -> {
                    throw new RuntimeException("Product not found");
                });
            customerOrderDetail.setCustomerOrder(customerOrder);
            customerOrderDetail.setQuantity(dto.getQuantity());
            customerOrderDetail.setUnitPrice(dto.getPrice());
            customerOrderDetail.setTotalPrice(dto.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity())));
            totalAmount = totalAmount.add(customerOrderDetail.getTotalPrice());
            customerOrderDetails.add(customerOrderDetail);
        }

        savedCustomerOrder.setCustomerOrderDetails(customerOrderDetails);
        savedCustomerOrder.setTotalAmount(totalAmount);

        // Save order details
        customerOrderDetailRepository.saveAll(customerOrderDetails);

        // Create and save payment details
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setCustomerOrder(savedCustomerOrder);
        paymentDetails.setCardHolderName(createCustomerOrderDTO.getPaymentDetails().getCardHolderName());
        paymentDetails.setCardNumber(createCustomerOrderDTO.getPaymentDetails().getCardNumber());
        paymentDetails.setExpiryDate(createCustomerOrderDTO.getPaymentDetails().getExpiryDate());
        paymentDetails.setPaymentMethod(createCustomerOrderDTO.getPaymentDetails().getPaymentMethod());

        paymentDetails = paymentDetailsRepository.save(paymentDetails);

        savedCustomerOrder.setPaymentDetails(paymentDetails);
        savedCustomerOrder = customerOrderRepository.save(savedCustomerOrder);

        return new ResponseEntity<>(modelMapper.map(savedCustomerOrder, CustomerOrderDTO.class), HttpStatus.CREATED);
    }

    /**
     * Retrieves all orders.
     *
     * @return a list of orders
     */
    public List<CustomerOrderDTO> getAllOrders() {
        List<CustomerOrder> orders = customerOrderRepository.findAll();
        return orders.stream()
            .map(customerOrder -> modelMapper.map(customerOrder, CustomerOrderDTO.class))
            .collect(Collectors.toList());
    }


    /**
     * Deletes an order for the current user.
     *
     * @param orderId the order ID
     * @return response entity
     */
    public ResponseEntity<Void> deleteOrder(Long orderId) {
        return customerOrderRepository.findByOrderId(orderId)
            .map(customerOrder -> {
                customerOrderRepository.delete(customerOrder);
                return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
            })
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
