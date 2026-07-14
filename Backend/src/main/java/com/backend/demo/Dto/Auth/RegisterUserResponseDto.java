package com.backend.demo.Dto.Auth;

import com.backend.demo.Dto.User.UserResponseDto;
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
