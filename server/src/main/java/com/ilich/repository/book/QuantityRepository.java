package com.ilich.repository.book;

import com.ilich.model.book.Quantity;

public interface QuantityRepository {

    Quantity getQuantity(long isbn);

    String addQuantity(Quantity quantity);

    String updateQuantity(Quantity quantity);
}
