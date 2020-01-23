package com.ilich.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

import static com.ilich.StringProperties.*;

@Component
public class BookFileLoader {

    public String saveFile(MultipartFile file, long isbn) {
        try {
            Files.write(Paths.get(fullPath(isbn)), file.getBytes());
        } catch (IOException e) {
            return FAIL;
        }
        return SUCCESS;
    }

    public byte[] getFile(long isbn) {
        byte[] file = new byte[0];
        try {
            file = Files.readAllBytes(Paths.get(fullPath(isbn)));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return file;
    }

    public void removeFile(long isbn) {
        try {
            Files.delete(Paths.get(fullPath(isbn)));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private String fullPath(long isbn) {
        return PATH_TO_FILES + isbn;
    }
}
