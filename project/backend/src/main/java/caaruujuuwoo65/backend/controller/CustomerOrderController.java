package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.config.PreAuthorizeAdmin;
import caaruujuuwoo65.backend.dto.order.CreateCustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.CustomerOrderDTO;
import caaruujuuwoo65.backend.dto.order.UpdateCustomerOrderDTO;
import caaruujuuwoo65.backend.service.CustomerOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class CustomerOrderController {

    private final CustomerOrderService customerOrderService;

    @Autowired
    public CustomerOrderController(CustomerOrderService customerOrderService) {
        this.customerOrderService = customerOrderService;
    }

    @PostMapping("/create")
    @Operation(summary = "Create a new order", description = "Create a new order in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid order details"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<CustomerOrderDTO> createOrder(@RequestBody CreateCustomerOrderDTO createCustomerOrderDTO) {
        return customerOrderService.createOrder(createCustomerOrderDTO);
    }

    @PreAuthorizeAdmin
    @GetMapping("/")
    @Operation(summary = "Get all orders", description = "Get all orders from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<CustomerOrderDTO>> getAllOrders() {
        List<CustomerOrderDTO> orders = customerOrderService.getAllOrders();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PreAuthorizeAdmin
    @DeleteMapping("/{orderId}")
    @Operation(summary = "Delete an order", description = "Delete an order from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Order deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        return customerOrderService.deleteOrder(orderId);
    }
}
