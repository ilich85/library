package com.ilich.controller.book;

import com.ilich.model.book.Quantity;
import com.ilich.service.book.QuantityService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/quantity")
@CrossOrigin(value = "http://localhost:4200")
public class QuantityController {

    private final QuantityService quantityService;

    public QuantityController(QuantityService quantityService) {
        this.quantityService = quantityService;
    }

    @GetMapping("/{isbn}")
    public Quantity getQuantity(@PathVariable long isbn) {
        return quantityService.getQuantity(isbn);
    }

    @PostMapping
    public String addQuantity(@RequestBody Quantity quantity) {
        return quantityService.addQuantity(quantity);
    }

    @PutMapping
    public String updateQuantity(@RequestBody Quantity newQuantity) {
        Quantity oldQuantity = quantityService.getQuantity(newQuantity.getIsbn());
        int difference = newQuantity.getAmount() - oldQuantity.getAmount();
        newQuantity.setAvailable(oldQuantity.getAvailable() + difference);
        return quantityService.updateQuantity(newQuantity);
    }
}
