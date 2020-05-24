package com.ilich.process;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.ilich.StringProperties.FAIL;
import static com.ilich.StringProperties.SUCCESS;

public abstract class InputOutputProcess {

    public byte[] get(long isbn) {
        byte[] file = new byte[0];
        try {
            file = Files.readAllBytes(Paths.get(fullPath(isbn)));
        } catch (IOException e) {
            System.out.println("No such file");
        }
        return file;
    }

    public String save(long isbn, MultipartFile file) {
        try {
            Files.write(Paths.get(fullPath(isbn)), file.getBytes());
        } catch (IOException e) {
            return FAIL;
        }
        return SUCCESS;
    }

    public String update(long isbn, MultipartFile file) {
        try {
            Files.delete(Paths.get(fullPath(isbn)));
            Files.write(Paths.get(fullPath(isbn)), file.getBytes());
        } catch (IOException e) {
            return FAIL;
        }
        return SUCCESS;
    }

    public String remove(long isbn) {
        try {
            Files.delete(Paths.get(fullPath(isbn)));
        } catch (IOException e) {
            return FAIL;
        }
        return SUCCESS;
    }

    protected abstract String fullPath(long isbn);
}
