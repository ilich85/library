package com.ilich.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stores")
public class Store {

    @JsonProperty("username")
    private String username;
    @JsonProperty("isbn")
    private long isbn;

    public Store(String username, long isbn) {
        this.username = username;
        this.isbn = isbn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public long getIsbn() {
        return isbn;
    }

    public void setIsbn(long isbn) {
        this.isbn = isbn;
    }
}
