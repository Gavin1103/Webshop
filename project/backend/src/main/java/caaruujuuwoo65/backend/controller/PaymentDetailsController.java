package caaruujuuwoo65.backend.controller;

import caaruujuuwoo65.backend.dto.payment.details.CreatePaymentDetailsDTO;
import caaruujuuwoo65.backend.dto.payment.details.PaymentDetailsDTO;
import caaruujuuwoo65.backend.dto.payment.details.UpdatePaymentDetailsDTO;
import caaruujuuwoo65.backend.service.PaymentDetailsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payment-details")
public class PaymentDetailsController {

    private final PaymentDetailsService paymentDetailsService;

    @Autowired
    public PaymentDetailsController(PaymentDetailsService paymentDetailsService) {
        this.paymentDetailsService = paymentDetailsService;
    }

    @PostMapping("/")
    @Operation(summary = "Create new payment details", description = "Create new payment details in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Payment details created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid payment details"),
        @ApiResponse(responseCode = "404", description = "Order or Payment Method not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<PaymentDetailsDTO> createPaymentDetails(@Valid @RequestBody CreatePaymentDetailsDTO createPaymentDetailsDTO) {
        return paymentDetailsService.createPaymentDetails(createPaymentDetailsDTO);
    }

    @PutMapping("/{paymentDetailsId}")
    @Operation(summary = "Update existing payment details", description = "Update existing payment details in the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Payment details updated successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid payment details"),
        @ApiResponse(responseCode = "404", description = "Payment details or Payment Method not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<PaymentDetailsDTO> updatePaymentDetails(@PathVariable Long paymentDetailsId, @Valid @RequestBody UpdatePaymentDetailsDTO updatePaymentDetailsDTO) {
        return paymentDetailsService.updatePaymentDetails(paymentDetailsId, updatePaymentDetailsDTO);
    }

    @DeleteMapping("/{paymentDetailsId}")
    @Operation(summary = "Delete existing payment details", description = "Delete existing payment details from the database")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Payment details deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Payment details not found"),
        @ApiResponse(responseCode = "500", description = "An unexpected error occurred")
    })
    public ResponseEntity<Void> deletePaymentDetails(@PathVariable Long paymentDetailsId) {
        return paymentDetailsService.deletePaymentDetails(paymentDetailsId);
    }
}
