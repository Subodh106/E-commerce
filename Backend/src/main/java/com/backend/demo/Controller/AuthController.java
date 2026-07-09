package com.backend.demo.Controller;
import com.backend.demo.Dto.auth.*;
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
                .secure(true)
                .sameSite("Strict")
                .maxAge(Duration.ofDays(1))
                .path("/")
                .httpOnly(true)
                .build();
        System.out.println(response.getUser());
        RegisterUserResponseDto registerUserResponseDto = new RegisterUserResponseDto("User Registered Successfully", response.getUser());
        return ResponseEntity.status(HttpStatus.CREATED)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(registerUserResponseDto);
    }
    @PostMapping("/login")
    public ResponseEntity<LoginUserResponseDto> login(@Valid @RequestBody LoginUserDto loginUserDto){
        AuthResponseDto response = authService.loginUser(loginUserDto);
        String token = response.getToken();
        ResponseCookie cookie = ResponseCookie.from("jwt",token)
                .secure(true)
                .sameSite("Strict")
                .maxAge(Duration.ofDays(1))
                .path("/")
                .httpOnly(true)
                .build();
        LoginUserResponseDto loginUserResponseDto = new LoginUserResponseDto("User Login Successfully",response.getUser());
        return  ResponseEntity.status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE,cookie.toString())
                .body(loginUserResponseDto);
    }
}
