package com.backend.demo.Controller;
import com.backend.demo.Dto.AuthResponseDto;
import com.backend.demo.Dto.RegisterUserDto;
import com.backend.demo.Dto.RegisterUserResponseDto;
import com.backend.demo.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
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
    public ResponseEntity<RegisterUserResponseDto> registerUser(@Valid @RequestBody RegisterUserDto registerUserDto) {
        AuthResponseDto response = authService.registerUser(registerUserDto);
        String token = response.getToken();
        ResponseCookie cookie = ResponseCookie.from("jwt", token)
                .secure(false)
                .sameSite("Strict")
                .maxAge(Duration.ofDays(1))
                .path("/")
                .httpOnly(true)
                .build();
        RegisterUserResponseDto registerUserResponseDto = new RegisterUserResponseDto("User Registered Successfully", response.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(registerUserResponseDto);
    }
}
