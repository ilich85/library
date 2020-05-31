package com.ilich.controller.book;

import com.ilich.model.Result;
import com.ilich.service.book.FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

@RestController
@RequestMapping("/files/{isbn}")
@CrossOrigin(value = "http://localhost:4200")
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping
    public ResponseEntity<?> getFile(@PathVariable long isbn) {
        return ResponseEntity.ok(new Result("data:application/octet-stream;base64, "
                + Base64.getEncoder().encodeToString(fileService.get(isbn))));
    }

    @PostMapping
    public ResponseEntity<?> saveFile(@PathVariable long isbn, @RequestParam MultipartFile file) {
        return ResponseEntity.ok(new Result(fileService.save(isbn, file)));
    }

    @PutMapping
    public ResponseEntity<?> updateFile(@PathVariable long isbn, @RequestParam MultipartFile file) {
        return ResponseEntity.ok(new Result(fileService.update(isbn, file)));
    }
}
