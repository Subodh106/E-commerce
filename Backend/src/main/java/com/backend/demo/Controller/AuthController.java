package com.backend.demo.Controller;

import com.backend.demo.Dto.RegisterUserDto;
import com.backend.demo.Dto.RegisterUserResponseDto;
import com.backend.demo.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/api/v1/auth/user")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<RegisterUserResponseDto> RegisterUser(@Valid @RequestBody RegisterUserDto registerUserDto){
        String token = authService.registerUser(registerUserDto);
        ResponseCookie cookie = ResponseCookie.from("jwt",token)
                .secure(false)
                .sameSite("Strict")
                .maxAge(Duration.ofDays(1))
                .path("/")
                .httpOnly(true)
                .build();
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(new RegisterUserResponseDto("User registered successfully"));
    }
}
