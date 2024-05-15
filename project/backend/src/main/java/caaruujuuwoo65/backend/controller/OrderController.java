package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.order.CreateOrderDTO;
import caaruujuuwoo65.backend.dto.order.OrderDTO;
import caaruujuuwoo65.backend.dto.order.UpdateOrderDTO;
import caaruujuuwoo65.backend.service.OrderService;
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
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/")
    @Operation(summary = "Create a new order for the current user", description = "Create a new order in the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Order created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid order details"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<OrderDTO> createOrder(@RequestBody CreateOrderDTO createOrderDTO) {
        return orderService.createOrder(createOrderDTO);
    }

    @GetMapping("/")
    @Operation(summary = "Get all orders for the current user", description = "Get all orders from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Orders retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<OrderDTO>> getAllOrdersForCurrentUser() {
        List<OrderDTO> orders = orderService.getAllOrdersForCurrentUser();
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

    @PutMapping("/{orderId}")
    @Operation(summary = "Update an existing order for the current user", description = "Update an existing order in the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Order updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid order details"),
        @ApiResponse(responseCode = "404", description = "Order not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<OrderDTO> updateOrder(@PathVariable Long orderId, @RequestBody UpdateOrderDTO updateOrderDTO) {
        return orderService.updateOrder(orderId, updateOrderDTO);
    }

    @DeleteMapping("/{orderId}")
    @Operation(summary = "Delete an order for the current user", description = "Delete an order from the database for the current user")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Order deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Order not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deleteOrder(@PathVariable Long orderId) {
        return orderService.deleteOrder(orderId);
    }
}
