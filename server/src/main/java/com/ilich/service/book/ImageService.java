package com.ilich.service.book;

import com.ilich.process.ImageProcess;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {

    private final ImageProcess imageProcess;

    public ImageService(ImageProcess imageProcess) {
        this.imageProcess = imageProcess;
    }

    public byte[] get(long isbn) {
        return imageProcess.get(isbn);
    }

    public String save(long isbn, MultipartFile image) {
        return imageProcess.save(isbn, image);
    }

    public String update(long isbn, MultipartFile image) {
        return imageProcess.update(isbn, image);
    }

    public String remove(long isbn) {
        return imageProcess.remove(isbn);
    }
}
