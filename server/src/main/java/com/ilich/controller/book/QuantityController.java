package com.ilich.controller.book;

import com.ilich.model.Result;
import com.ilich.model.book.Quantity;
import com.ilich.service.book.QuantityService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> getQuantity(@PathVariable long isbn) {
        return ResponseEntity.ok(quantityService.getQuantity(isbn));
    }

    @PostMapping
    public ResponseEntity<?> addQuantity(@RequestBody Quantity quantity) {
        return ResponseEntity.ok(new Result(quantityService.addQuantity(quantity)));
    }

    @PutMapping
    public ResponseEntity<?> updateQuantity(@RequestBody Quantity newQuantity) {
        Quantity oldQuantity = quantityService.getQuantity(newQuantity.getIsbn());
        int difference = newQuantity.getAmount() - oldQuantity.getAmount();
        newQuantity.setAvailable(oldQuantity.getAvailable() + difference);
        return ResponseEntity.ok(new Result(quantityService.updateQuantity(newQuantity)));
    }
}
