package com.backend.demo.Exception.Handler;

import com.backend.demo.Dto.Exception.ExceptionResponseDto;
import com.backend.demo.Exception.Custom.InvalidCredentialsException;
import com.backend.demo.Exception.Custom.ResourceNotFoundException;
import com.backend.demo.Exception.Custom.DuplicatedValueException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ExceptionResponseDto> handleRuntimeException(RuntimeException ex, HttpServletRequest request){
        ExceptionResponseDto exceptionResponseDto = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exceptionResponseDto);
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ExceptionResponseDto> handleResourceNotFoundException(ResourceNotFoundException ex, HttpServletRequest request){
        ExceptionResponseDto exceptionResponseDto = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                HttpStatus.NOT_FOUND.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(exceptionResponseDto);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponseDto> handleGenericException(Exception ex , HttpServletRequest request){
        ExceptionResponseDto exceptionResponseDto = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                HttpStatus.INTERNAL_SERVER_ERROR.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(exceptionResponseDto);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String ,String>> handleValidationException(MethodArgumentNotValidException ex){
        Map<String ,String > errors = new HashMap<>();
        ex.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        errors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );
        return ResponseEntity.badRequest().body(errors);
    }
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ExceptionResponseDto> handleInvalidCredentialsException(Exception ex,HttpServletRequest request){
        ExceptionResponseDto exceptionResponseDto = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.UNAUTHORIZED.value(),
                HttpStatus.UNAUTHORIZED.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(exceptionResponseDto);
    }

    @ExceptionHandler(DuplicatedValueException.class)
    public ResponseEntity<ExceptionResponseDto> handleDuplicatedValueException(Exception ex,HttpServletRequest request){
        ExceptionResponseDto exceptionResponseDto = new ExceptionResponseDto(
                LocalDateTime.now(),
                HttpStatus.CONFLICT.value(),
                HttpStatus.CONFLICT.getReasonPhrase(),
                ex.getMessage(),
                request.getRequestURI()
        );
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(exceptionResponseDto);
    }
}