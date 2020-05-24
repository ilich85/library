package com.ilich.process;

import org.springframework.stereotype.Component;

import static com.ilich.StringProperties.PATH_TO_IMAGES;

@Component
public class ImageProcess extends InputOutputProcess {

    protected String fullPath(long isbn) {
        return PATH_TO_IMAGES + isbn;
    }
}
