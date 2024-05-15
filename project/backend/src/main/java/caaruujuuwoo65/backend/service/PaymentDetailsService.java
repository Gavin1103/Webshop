package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.PaymentDetailsDTO;
import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.PaymentDetails;
import caaruujuuwoo65.backend.model.PaymentMethod;
import caaruujuuwoo65.backend.repository.PaymentMethodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service class for managing payment details.
 */
@Service
public class PaymentDetailsService {

    private final PaymentMethodRepository paymentMethodRepository;

    /**
     * Constructs a new PaymentDetailsService.
     *
     * @param paymentMethodRepository the repository for payment method data
     */
    @Autowired
    public PaymentDetailsService(PaymentMethodRepository paymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }

    /**
     * Converts an PaymentDetails entity to an PaymentDetailsDTO.
     *
     * @param paymentDetails the PaymentDetails entity
     * @return the PaymentDetails DTO
     */
    public PaymentDetailsDTO convertToDTO(PaymentDetails paymentDetails) {
        PaymentDetailsDTO paymentDetailsDTO = new PaymentDetailsDTO();
        paymentDetailsDTO.setPaymentDetailsId(paymentDetails.getPaymentDetailsId());
        paymentDetailsDTO.setOrderId(paymentDetails.getOrder().getOrderId());
        paymentDetailsDTO.setPaymentMethodId(paymentDetails.getPaymentMethod().getPaymentMethodId());
        paymentDetailsDTO.setCardHolderName(paymentDetails.getCardHolderName());
        paymentDetailsDTO.setCardNumber(paymentDetails.getCardNumber());
        paymentDetailsDTO.setExpiryDate(paymentDetails.getExpiryDate());
        return paymentDetailsDTO;
    }

    /**
     * Converts a PaymentDetailsDTO to a PaymentDetails entity.
     *
     * @param paymentDetailsDTO the PaymentDetails DTO
     * @return the PaymentDetails entity
     */
    public PaymentDetails convertToEntity(PaymentDetailsDTO paymentDetailsDTO) {
        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setPaymentDetailsId(paymentDetailsDTO.getPaymentDetailsId());
        Order order = new Order();
        order.setOrderId(paymentDetailsDTO.getOrderId());
        paymentDetails.setOrder(order);
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentDetailsDTO.getPaymentMethodId())
            .orElseThrow(() -> new RuntimeException("Payment method not found"));
        paymentDetails.setPaymentMethod(paymentMethod);
        paymentDetails.setCardHolderName(paymentDetailsDTO.getCardHolderName());
        paymentDetails.setCardNumber(paymentDetailsDTO.getCardNumber());
        paymentDetails.setExpiryDate(paymentDetailsDTO.getExpiryDate());
        return paymentDetails;
    }
}