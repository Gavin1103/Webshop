package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.payment.details.CreatePaymentDetailsDTO;
import caaruujuuwoo65.backend.dto.payment.details.PaymentDetailsDTO;
import caaruujuuwoo65.backend.dto.payment.details.UpdatePaymentDetailsDTO;
import caaruujuuwoo65.backend.model.Order;
import caaruujuuwoo65.backend.model.PaymentDetails;
import caaruujuuwoo65.backend.model.PaymentMethod;
import caaruujuuwoo65.backend.repository.OrderRepository;
import caaruujuuwoo65.backend.repository.PaymentDetailsRepository;
import caaruujuuwoo65.backend.repository.PaymentMethodRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class for managing payment details.
 */
@Service
public class PaymentDetailsService {

    private final PaymentDetailsRepository paymentDetailsRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final OrderRepository orderRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PaymentDetailsService(PaymentDetailsRepository paymentDetailsRepository, PaymentMethodRepository paymentMethodRepository, OrderRepository orderRepository, ModelMapper modelMapper) {
        this.paymentDetailsRepository = paymentDetailsRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.orderRepository = orderRepository;
        this.modelMapper = modelMapper;
    }

    /**
     * Creates new payment details.
     *
     * @param createPaymentDetailsDTO the payment details DTO
     * @return the created payment details
     */
    public ResponseEntity<PaymentDetailsDTO> createPaymentDetails(CreatePaymentDetailsDTO createPaymentDetailsDTO) {
        Optional<Order> orderOptional = orderRepository.findById(createPaymentDetailsDTO.getOrderId());
        if (!orderOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<PaymentMethod> paymentMethodOptional = paymentMethodRepository.findByType(createPaymentDetailsDTO.getPaymentMethod());
        if (!paymentMethodOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setOrder(orderOptional.get());
        paymentDetails.setPaymentMethod(paymentMethodOptional.get());
        paymentDetails.setCardHolderName(createPaymentDetailsDTO.getCardHolderName());
        paymentDetails.setCardNumber(createPaymentDetailsDTO.getCardNumber());
        paymentDetails.setExpiryDate(createPaymentDetailsDTO.getExpiryDate());

        paymentDetails = paymentDetailsRepository.save(paymentDetails);
        PaymentDetailsDTO paymentDetailsDTO = modelMapper.map(paymentDetails, PaymentDetailsDTO.class);

        return new ResponseEntity<>(paymentDetailsDTO, HttpStatus.CREATED);
    }


    /**
     * Updates existing payment details.
     *
     * @param paymentDetailsId        the payment details ID
     * @param updatePaymentDetailsDTO the payment details DTO
     * @return the updated payment details
     */
    public ResponseEntity<PaymentDetailsDTO> updatePaymentDetails(Long paymentDetailsId, UpdatePaymentDetailsDTO updatePaymentDetailsDTO) {
        Optional<PaymentDetails> paymentDetailsOptional = paymentDetailsRepository.findById(paymentDetailsId);
        if (!paymentDetailsOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Optional<PaymentMethod> paymentMethodOptional = paymentMethodRepository.findByType(updatePaymentDetailsDTO.getPaymentMethod());
        if (!paymentMethodOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PaymentDetails paymentDetails = paymentDetailsOptional.get();
        paymentDetails.setPaymentMethod(paymentMethodOptional.get());
        paymentDetails.setCardHolderName(updatePaymentDetailsDTO.getCardHolderName());
        paymentDetails.setCardNumber(updatePaymentDetailsDTO.getCardNumber());
        paymentDetails.setExpiryDate(updatePaymentDetailsDTO.getExpiryDate());

        paymentDetails = paymentDetailsRepository.save(paymentDetails);
        PaymentDetailsDTO paymentDetailsDTO = modelMapper.map(paymentDetails, PaymentDetailsDTO.class);

        return new ResponseEntity<>(paymentDetailsDTO, HttpStatus.OK);
    }

    /**
     * Deletes existing payment details.
     *
     * @param paymentDetailsId the payment details ID
     * @return response entity
     */
    public ResponseEntity<Void> deletePaymentDetails(Long paymentDetailsId) {
        if (!paymentDetailsRepository.existsById(paymentDetailsId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        paymentDetailsRepository.deleteById(paymentDetailsId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}