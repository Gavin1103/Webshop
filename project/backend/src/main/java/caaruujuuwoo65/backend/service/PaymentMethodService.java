package caaruujuuwoo65.backend.service;

import caaruujuuwoo65.backend.dto.payment.method.CreatePaymentMethodDTO;
import caaruujuuwoo65.backend.dto.payment.method.UpdatePaymentMethodDTO;
import caaruujuuwoo65.backend.model.PaymentMethod;
import caaruujuuwoo65.backend.repository.PaymentMethodRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Service class for managing payment methods.
 */
@Service
public class PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public PaymentMethodService(PaymentMethodRepository paymentMethodRepository, ModelMapper modelMapper) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.modelMapper = modelMapper;
    }

    /**
     * Creates a new payment method.
     *
     * @param createPaymentMethodDTO the payment method DTO
     * @return the created payment method
     */
    public ResponseEntity<PaymentMethod> createPaymentMethod(CreatePaymentMethodDTO createPaymentMethodDTO) {
        PaymentMethod paymentMethod = modelMapper.map(createPaymentMethodDTO, PaymentMethod.class);
        paymentMethod = paymentMethodRepository.save(paymentMethod);
        return new ResponseEntity<>(paymentMethod, HttpStatus.CREATED);
    }

    /**
     * Updates an existing payment method.
     *
     * @param paymentMethodId        the payment method ID
     * @param updatePaymentMethodDTO the payment method DTO
     * @return the updated payment method
     */
    public ResponseEntity<PaymentMethod> updatePaymentMethod(Long paymentMethodId, UpdatePaymentMethodDTO updatePaymentMethodDTO) {
        Optional<PaymentMethod> paymentMethodOptional = paymentMethodRepository.findById(paymentMethodId);
        if (!paymentMethodOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        PaymentMethod paymentMethod = paymentMethodOptional.get();
        modelMapper.map(updatePaymentMethodDTO, paymentMethod);
        paymentMethod = paymentMethodRepository.save(paymentMethod);

        return new ResponseEntity<>(paymentMethod, HttpStatus.OK);
    }

    /**
     * Deletes an existing payment method.
     *
     * @param paymentMethodId the payment method ID
     * @return response entity
     */
    public ResponseEntity<Void> deletePaymentMethod(Long paymentMethodId) {
        if (!paymentMethodRepository.existsById(paymentMethodId)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        paymentMethodRepository.deleteById(paymentMethodId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /**
     * Retrieves all payment methods.
     *
     * @return a list of payment methods
     */
    public List<PaymentMethod> getAllPaymentMethods() {
        return paymentMethodRepository.findAll();
    }
}
