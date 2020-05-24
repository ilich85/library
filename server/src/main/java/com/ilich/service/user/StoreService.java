package com.ilich.service.user;

import com.ilich.model.user.Store;
import com.ilich.repository.user.StoreRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StoreService {

    private final StoreRepository storeRepository;

    public StoreService(StoreRepository storeRepository) {
        this.storeRepository = storeRepository;
    }

    public List<Store> getBooksAtUser(String username) {
        return storeRepository.getBooksAtUser(username);
    }

    public String addBookToStore(Store store) {
        return storeRepository.addBookToStore(store);
    }

    public String removeBookFromStore(String username, long isbn) {
        return storeRepository.removeBookFromStore(username, isbn);
    }

    public String removeBooksBeforeRemoveUser(String username) {
        return storeRepository.removeBooksBeforeRemoveUser(username);
    }
}
