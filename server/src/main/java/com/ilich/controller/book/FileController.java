package com.ilich.controller.book;

import com.ilich.service.book.FileService;
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
    public String getFile(@PathVariable long isbn) {
        return "data:application/octet-stream;base64, " + Base64.getEncoder().encodeToString(fileService.get(isbn));
    }

    @PostMapping
    public String saveFile(@PathVariable long isbn, @RequestParam MultipartFile file) {
        return fileService.save(isbn, file);
    }

    @PutMapping
    public String updateFile(@PathVariable long isbn, @RequestParam MultipartFile file) {
        return fileService.update(isbn, file);
    }
}
