package com.ilich.controller.book;

import com.ilich.model.Result;
import com.ilich.service.book.ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedInputStream;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLConnection;
import java.util.Base64;

@RestController
@RequestMapping("/images/{isbn}")
@CrossOrigin(value = "http://localhost:4200")
public class ImageController {

    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @GetMapping
    public ResponseEntity<?> getImage(@PathVariable long isbn) throws IOException {
        byte[] imageBytes = imageService.get(isbn);
        String result = "";
        if (imageBytes.length > 0) {
            InputStream is = new BufferedInputStream(new ByteArrayInputStream(imageBytes));
            String mimeType = URLConnection.guessContentTypeFromStream(is);
            result = "data:" + mimeType + ";base64," + Base64.getEncoder().encodeToString(imageBytes);
        }
        return ResponseEntity.ok(new Result(result));
    }

    @PostMapping
    public ResponseEntity<?> saveImage(@PathVariable long isbn, @RequestParam MultipartFile image) {
        return ResponseEntity.ok(new Result(imageService.save(isbn, image)));
    }

    @PutMapping
    public ResponseEntity<?> updateImage(@PathVariable long isbn, @RequestParam MultipartFile image) {
        return ResponseEntity.ok(new Result(imageService.update(isbn, image)));
    }
}
