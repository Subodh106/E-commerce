package com.backend.demo.Exception.Custom;

public class UnsupportedJwtException extends RuntimeException {
    public UnsupportedJwtException(String message) {
        super(message);
    }
}
