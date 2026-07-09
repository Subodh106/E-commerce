package com.backend.demo.Dto.auth;

import com.backend.demo.Dto.user.UserResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RegisterUserResponseDto {
    private String message;
    private UserResponseDto user;
}
