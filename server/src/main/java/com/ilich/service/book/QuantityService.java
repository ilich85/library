package com.ilich.service.book;

import com.ilich.model.book.Quantity;
import com.ilich.repository.book.QuantityRepository;
import org.springframework.stereotype.Service;

@Service
public class QuantityService {

    private final QuantityRepository quantityRepository;

    public QuantityService(QuantityRepository quantityRepository) {
        this.quantityRepository = quantityRepository;
    }

    public Quantity getQuantity(long isbn) {
        return quantityRepository.getQuantity(isbn);
    }

    public String addQuantity(Quantity quantity) {
        return quantityRepository.addQuantity(quantity);
    }

    public String updateQuantity(Quantity quantity) {
        return quantityRepository.updateQuantity(quantity);
    }
}
