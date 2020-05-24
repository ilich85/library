package com.ilich.repository.user;

import com.ilich.model.user.Store;

import java.util.List;

public interface StoreRepository {

    List<Store> getBooksAtUser(String username);

    String addBookToStore(Store store);

    String removeBookFromStore(String username, long isbn);

    String removeBooksBeforeRemoveUser(String username);
}
