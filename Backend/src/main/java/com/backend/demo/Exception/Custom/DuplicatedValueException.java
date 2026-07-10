package com.backend.demo.Exception.Custom;

public class DuplicatedValueException extends RuntimeException {
    public DuplicatedValueException(String message) {
        super(message);
    }
}
