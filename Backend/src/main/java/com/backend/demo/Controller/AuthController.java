package com.backend.demo.Controller;

import com.backend.demo.Dto.RegisterUserResponseDto;
import com.backend.demo.Dto.RegisterUserDto;
import com.backend.demo.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> RegisterUser(@Valid @RequestBody RegisterUserDto registerUserDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(registerUserDto));
    }
}
