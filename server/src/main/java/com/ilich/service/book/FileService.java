package com.ilich.service.book;

import com.ilich.process.FileProcess;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService {

    private final FileProcess fileProcess;

    public FileService(FileProcess fileProcess) {
        this.fileProcess = fileProcess;
    }

    public byte[] get(long isbn) {
        return fileProcess.get(isbn);
    }

    public String save(long isbn, MultipartFile file) {
        return fileProcess.save(isbn, file);
    }

    public String update(long isbn, MultipartFile file) {
        return fileProcess.update(isbn, file);
    }

    public String remove(long isbn) {
        return fileProcess.remove(isbn);
    }
}
