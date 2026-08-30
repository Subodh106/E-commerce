package com.backend.demo.Exception.Custom;

public class SignatureException extends RuntimeException {
    public SignatureException(String message) {
        super(message);
    }
}
