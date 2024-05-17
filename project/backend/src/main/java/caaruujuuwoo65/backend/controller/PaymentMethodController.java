package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.payment.method.CreatePaymentMethodDTO;
import caaruujuuwoo65.backend.dto.payment.method.UpdatePaymentMethodDTO;
import caaruujuuwoo65.backend.model.PaymentMethod;
import caaruujuuwoo65.backend.service.PaymentMethodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payment-methods")
public class PaymentMethodController {

    private final PaymentMethodService paymentMethodService;

    @Autowired
    public PaymentMethodController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/")
    @Operation(summary = "Create a new payment method", description = "Create a new payment method in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Payment method created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid payment method details"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<PaymentMethod> createPaymentMethod(@RequestBody CreatePaymentMethodDTO createPaymentMethodDTO) {
        return paymentMethodService.createPaymentMethod(createPaymentMethodDTO);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PutMapping("/{paymentMethodId}")
    @Operation(summary = "Update an existing payment method", description = "Update an existing payment method in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment method updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid payment method details"),
        @ApiResponse(responseCode = "404", description = "Payment method not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<PaymentMethod> updatePaymentMethod(@PathVariable Long paymentMethodId, @RequestBody UpdatePaymentMethodDTO updatePaymentMethodDTO) {
        return paymentMethodService.updatePaymentMethod(paymentMethodId, updatePaymentMethodDTO);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("/{paymentMethodId}")
    @Operation(summary = "Delete an existing payment method", description = "Delete an existing payment method from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Payment method deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Payment method not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deletePaymentMethod(@PathVariable Long paymentMethodId) {
        return paymentMethodService.deletePaymentMethod(paymentMethodId);
    }

    @GetMapping("/")
    @Operation(summary = "Get all payment methods", description = "Get all payment methods from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment methods retrieved successfully"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<List<PaymentMethod>> getAllPaymentMethods() {
        List<PaymentMethod> paymentMethods = paymentMethodService.getAllPaymentMethods();
        return new ResponseEntity<>(paymentMethods, HttpStatus.OK);
    }
}
