package com.backend.demo.Exception.Custom;

public class MalformedTokenException extends RuntimeException {
    public MalformedTokenException(String message) {
        super(message);
    }
}
